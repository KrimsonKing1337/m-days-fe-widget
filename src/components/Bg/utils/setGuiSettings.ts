import { PresetOptionsGui } from '@types';

export function setGuiSettings(guiSettings: PresetOptionsGui) {
  const {
    noGui,
    noMDays,
    weather,
    year,
    date,
    progressBar,
    days,
    percent,
    percentFull,
    watermark,
  } = guiSettings;

  const noMDaysParam = new URLSearchParams(window.location.search).get('no-m-days');
  const noMDaysValue = noMDaysParam !== null;

  const noGuiParam = new URLSearchParams(window.location.search).get('no-gui');
  const noGuiValue = noGuiParam !== null;

  const $body = $('body');

  const $progressBar = $('.js-progress-bar');
  const $contentWrapperWithPercent = $progressBar.find('.js-content-wrapper.with-percent');
  const $contentWrapperNoPercent = $progressBar.find('.js-content-wrapper.no-percent');

  const $weather = $('.js-weather');

  const applyNoMDays = () => {
    $body.addClass('no-m-days');

    $contentWrapperWithPercent.hide();
    $contentWrapperNoPercent.show();
  }

  const applyNoGui = () => {
    $body.addClass('no-gui');

    $contentWrapperWithPercent.hide();
    $weather.remove();
  }

  if (noMDays === true) {
    applyNoMDays();
  }

  if (noGui === true) {
    applyNoGui();
  }

  if (weather === false) {
    $body.addClass('no-weather');
    $weather.remove();
  }

  if (year === false) $body.addClass('no-year');
  if (date === false) $body.addClass('no-date');
  if (progressBar === false) $body.addClass('no-progress-bar');
  if (days === false) $body.addClass('no-days');
  if (percent === false) $body.addClass('no-percent');
  if (percentFull === false) $body.addClass('no-percent-full');
  if (weather === false) $body.addClass('no-weather');
  if (watermark === false) $body.addClass('no-watermark');

  if (noMDaysValue) {
    applyNoMDays();
  }

  if (noGuiValue) {
    applyNoGui();
  }
}
