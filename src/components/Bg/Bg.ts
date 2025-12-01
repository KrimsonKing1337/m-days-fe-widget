import { getPresetInfo, getRandomMedia } from 'api';

import { setSkin as weatherSetSkin } from '../Weather/Weather';

import './Bg.scss';

$(async () => {
  const rootElement = document.querySelector('#root');

  if (!rootElement) {
    return;
  }

  if (isStandalone) {
    window.isStandalone = true;
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

  const presetInfo = await getPresetInfo(preset);

  let mediaNext = await getRandomMedia(preset);
  let bgNext = mediaNext.path;

  const changeOpacity = (value: string) => {
    $animWrapper.css('opacity', value);
  }

  const changeImage = async () => {
    $bg.css('background-image', `url(/${bgNext})`);

    mediaNext = await getRandomMedia(preset);
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
