import { type GetRandomMediaArgs, getRandomMediaSync } from 'api';

import { setSkin as weatherSetSkin } from '../Weather/utils';

import { getPresetInfoMiddleware } from './utils/getPresetInfoMiddleware';

import './Bg.scss';

$(async () => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    return;
  }

  const $bg = $('.js-bg');
  const $bgNext = $('.js-bg-next');
  const $animWrapper = $('.js-anim-wrapper');
  const $progressBarsWrapper = $('.js-progress-bars-wrapper');
  const $progressBarsDull = $('.js-progress-bars-dull');

  const $progressBar = $('.js-progress-bar');
  const $progressBarCyberpunk = $('.js-progress-bar-vaporwave');

  const searchParams = new URLSearchParams(window.location.search);

  const preset = searchParams.get('preset') || 'default';
  const width = searchParams.get('width');
  const height = searchParams.get('height');
  const theme = searchParams.get('theme');

  const windowWidth = window.outerWidth.toString();
  const windowHeight = window.innerHeight.toString();

  const presetInfo = await getPresetInfoMiddleware(preset);

  const params: GetRandomMediaArgs = {
    preset,
    width,
    height,
    windowWidth,
    windowHeight,
  };

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  let currentPath = '';
  let nextPath = '';

  async function scheduleNextCycle(params: GetRandomMediaArgs) {
    const media = await getRandomMediaSync(params);

    // nextPath приходит заранее
    nextPath = media.nextPath;

    const nowClient = Date.now();
    const drift = nowClient - media.serverTime;
    const nextChangeClient = media.nextChangeAt + drift;

    const changeDuration = 300;
    const fadeTotal = 700;

    const startFadeAt = nextChangeClient - changeDuration;
    const delay = startFadeAt - nowClient;

    setTimeout(() => {
      changeOpacity('0');

      setTimeout(() => {
        // ⬇ Момент смены
        currentPath = nextPath;
        $bg.css('background-image', `url(/${currentPath})`);

        // ⬇ Подгружаем следующий кадр
        nextPath = media.nextPath;
        $bgNext.css('background-image', `url(/${nextPath})`);
      }, changeDuration);

      setTimeout(() => {
        changeOpacity('1');
        scheduleNextCycle(params);
      }, fadeTotal);

    }, Math.max(0, delay));
  }

  async function initSlider(params: GetRandomMediaArgs) {
    const media = await getRandomMediaSync(params);

    currentPath = media.path;
    nextPath = media.nextPath;

    // ⬇ Показываем текущий кадр
    $bg.css('background-image', `url(/${currentPath})`);

    // ⬇ Загружаем следующий заранее
    $bgNext.css('background-image', `url(/${nextPath})`);

    const nowClient = Date.now();
    const drift = nowClient - media.serverTime;
    const nextChangeClient = media.nextChangeAt + drift;

    const changeDuration = 300;
    const startFadeAt = nextChangeClient - changeDuration;
    const delay = startFadeAt - nowClient;

    setTimeout(() => {
      changeOpacity('0');

      setTimeout(() => {
        // смена первого кадра сразу
        currentPath = nextPath;
        $bg.css('background-image', `url(/${currentPath})`);
      }, changeDuration);

      setTimeout(() => {
        changeOpacity('1');
        scheduleNextCycle(params);
      }, 700);
    }, Math.max(0, delay));
  }

  initSlider(params);

  if (presetInfo.options?.skin === 'cyberpunk' || theme === 'cyberpunk') {
    $progressBar.remove();
    weatherSetSkin('cyberpunk');
  } else {
    $progressBarCyberpunk.remove();
  }

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
