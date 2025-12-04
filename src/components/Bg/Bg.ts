import { setSkin as weatherSetSkin } from '../Weather/utils';

import { getRandomMediaMiddleware } from './utils/getRandomMediaMiddleware';
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

  const params = {
    preset,
    width,
    height,
    windowWidth,
    windowHeight,
  };

  let mediaNext = await getRandomMediaMiddleware(params);
  let bgNext = mediaNext.path;

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = async () => {
    $bg.css('background-image', `url(/${bgNext})`);

    mediaNext = await getRandomMediaMiddleware(params);
    bgNext = mediaNext.path;

    $bgNext.css('background-image', `url(/${bgNext})`);
  }

  changeImage();

  setInterval(() => {
    changeOpacity('0');

    setTimeout(() => {
      changeImage();
    }, 300); // transition duration

    setTimeout(() => {
      changeOpacity('1');
    }, 700);
  }, 12000);

  if (presetInfo.options?.skin === 'cyberpunk' || theme === 'cyberpunk') {
    $progressBar.remove();
    weatherSetSkin('cyberpunk');
  } else {
    $progressBarCyberpunk.remove();
  }

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
