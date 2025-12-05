import { PresetOptionsGui } from '@types';

export function setGuiSettings(guiSettings: PresetOptionsGui) {
  const {
    mode,
    noGui,
    noMDays,
    weather,
    year,
    date,
    time,
    hours,
    minutes,
    seconds,
    timeDots,
    progressBar,
    days,
    daysLabel,
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

  $body.addClass(`mode-${mode}`);

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

  if (weather !== undefined) {
    $body.addClass('gui-weather');
    $weather.remove();
  }

  if (year !== undefined) $body.addClass('gui-year');
  if (date !== undefined) $body.addClass('gui-date');
  if (time !== undefined) $body.addClass('gui-time');
  if (hours !== undefined) $body.addClass('gui-hours');
  if (minutes !== undefined) $body.addClass('gui-minutes');
  if (seconds !== undefined) $body.addClass('gui-seconds');
  if (timeDots !== undefined) $body.addClass('gui-time-dots');
  if (progressBar !== undefined) $body.addClass('gui-progress-bar');
  if (days !== undefined) $body.addClass('gui-days');
  if (daysLabel !== undefined) $body.addClass('gui-days-label');
  if (percent !== undefined) $body.addClass('gui-percent');
  if (percentFull !== undefined) $body.addClass('gui-percent-full');
  if (watermark !== undefined) $body.addClass('gui-watermark');

  if (noMDaysValue) {
    applyNoMDays();
  }

  if (noGuiValue) {
    applyNoGui();
  }
}
