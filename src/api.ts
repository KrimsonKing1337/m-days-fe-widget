import axios, { type AxiosResponse } from 'axios';

import { Media, Preset, WeatherResp } from './@types';

export type getCurrentWeatherParams = {
  latitude: number;
  longitude: number;
  protocol: 'http' | 'https';
};

export async function getCurrentWeather({ protocol, latitude, longitude }: getCurrentWeatherParams) {
  const params = {
    latitude,
    longitude,
    current_weather: true,
  };

  /*
  если делать https запрос, у safari на старых ios возникает ошибка: не могу установить безопасное соединение
  поэтому, отрываем приложение через https, но запрос на погоду делаем через http

  todo: но начиная с iphone 5 (проверить на iphone 4S) Сафари не разрешает заходить с https, но делать запросы на http.
   попытаться определять по user-agent или ещё по каким-нибудь особенностям какой перед нами девайс и в зависимости
   от этого запросы швырять либо на http, либо на https
  */
  const result: AxiosResponse<WeatherResp> = await axios.get(`${protocol}://api.open-meteo.com/v1/forecast`, { params });

  return result.data;
}

export type GetRandomMediaArgs = {
  preset: string;
  width: string | null;
  height: string | null;
  windowWidth: string | null;
  windowHeight: string | null;
};

export async function getRandomMedia(params: GetRandomMediaArgs): Promise<Media> {
  const result = await axios.get('/api/media', {
    params,
  });

  return result.data;
}

export async function getPresetInfo(preset: string): Promise<Preset> {
  const result = await axios.get('/api/preset', {
    params: { preset },
  });

  return result.data;
}
