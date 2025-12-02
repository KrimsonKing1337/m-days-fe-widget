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
  const width = searchParams.get('width') || '1920';

  const presetInfo = await getPresetInfoMiddleware(preset);

  let mediaNext = await getRandomMediaMiddleware({ preset, width });
  let bgNext = mediaNext.path;

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = async () => {
    $bg.css('background-image', `url(/${bgNext})`);

    mediaNext = await getRandomMediaMiddleware({ preset, width });
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

  if (presetInfo.skin === 'cyberpunk') {
    $progressBar.remove();
    weatherSetSkin('cyberpunk');
  } else {
    $progressBarCyberpunk.remove();
  }

  $progressBarsDull.hide();
  $progressBarsWrapper.show();
});
