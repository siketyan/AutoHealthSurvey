import { cwd, env } from 'process';

import { Chromium } from './chromium';
import { Answer } from './config';
import { ConfigLoader } from './config/loader';
import { GeneratorResolver } from './generator';
import { ConstantGenerator } from './generator/constant';
import { RandomGenerator } from './generator/random';
import { HandlerResolver } from './handler';
import { TextHandler } from './handler/text';
import { RadioHandler } from './handler/radio';
import { Authenticator } from './authenticator';

(async () => {
  const config = await new ConfigLoader(cwd()).load();

  if (config.version != 1) {
    throw new Error(
      `Config version ${config.version} is not supported.`,
    );
  }

  const chromium = new Chromium();
  const page = await chromium.launch(!!env['CHROMIUM_HEADFUL']);

  // Clears LocalStorage to reset answer
  console.log('Clearing Local Storage');
  await page.goto('https://forms.office.com/');
  await page.evaluate(() => {
    localStorage.clear();
  });

  console.log('Challenging to access to the form');
  const response = await page.goto(config.url);
  if (response.url().startsWith('https://login.microsoftonline.com/')) {
    console.log('Logging in automatically');
    await new Authenticator(page).login(
      env['MICROSOFT_EMAIL'],
      env['MICROSOFT_PASSWORD'],
    );
  }

  const generatorResolver = new GeneratorResolver([
    new ConstantGenerator(),
    new RandomGenerator(),
  ]);

  const handlerResolver = new HandlerResolver([
    new TextHandler(),
    new RadioHandler(),
  ]);

  const values = config.answers.map((answer: Answer): unknown =>
    generatorResolver.resolve(answer).generate(answer.options),
  );

  await page.waitForSelector('.office-form-body');

  for (let i = 0; i < values.length; ++i) {
    const $question = await page.waitForSelector(`.office-form-question:nth-child(${i + 1})`);
    const $title = await $question.$('.office-form-question-title > span:nth-child(2)');
    const $answer = await $question.$('.office-form-question-element');

    const title = await (await $title.getProperty('textContent')).jsonValue();
    const handler = await handlerResolver.resolve($answer);
    const value = values[i];
    await handler.handle($answer, value);

    console.log(`Q. ${title} -> A. ${value}`);
  }

  const submit = await page.$('button.__submit-button__');
  await submit.click();
  await page.waitForSelector('.thank-you-page-confirm');

  console.log('Done');

  await page.browser().close();
})()
  .catch(console.error)
;
