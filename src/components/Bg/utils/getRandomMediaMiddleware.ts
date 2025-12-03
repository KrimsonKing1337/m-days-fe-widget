/// #if standalone
import infoJson from 'standalone/info.json';
/// #endif

import { type GetRandomMediaArgs, getRandomMedia } from 'api';

import { getRandomMediaStandalone } from './getRandomMediaStandalone';

export async function getRandomMediaMiddleware(params: GetRandomMediaArgs) {
  /// #if standalone
  if (isStandalone) {
    const randomMedia = getRandomMediaStandalone(infoJson);

    return {
      path: randomMedia,
    };
  }
  /// #endif

  return await getRandomMedia(params);
}
