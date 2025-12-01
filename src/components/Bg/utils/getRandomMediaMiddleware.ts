import imgBgJson from 'standalone/img_bg.json';

import { getRandomMedia } from 'api';

import { getRandomMediaStandalone } from './getRandomMediaStandalone';

export async function getRandomMediaMiddleware(preset: string) {
  if (isStandalone) {
    const randomMedia = getRandomMediaStandalone(imgBgJson);

    return {
      path: randomMedia,
    };
  }

  return await getRandomMedia(preset);
}
