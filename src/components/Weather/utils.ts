export function setSkin(skin: string) {
  const $weather = $('.js-weather');
  const $weatherTemp = $weather.find('.js-weather-temp');

  $weatherTemp.addClass(`theme-${skin}`);

  window.weatherSkin = skin;
}
