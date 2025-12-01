/// #if standalone
import infoJson from 'standalone/info.json';
/// #endif

import { getRandomMedia } from 'api';

import { getRandomMediaStandalone } from './getRandomMediaStandalone';

export async function getRandomMediaMiddleware(preset: string) {
  /// #if standalone
  if (isStandalone) {
    const randomMedia = getRandomMediaStandalone(infoJson);

    return {
      path: randomMedia,
    };
  }
  /// #endif

  return await getRandomMedia(preset);
}
