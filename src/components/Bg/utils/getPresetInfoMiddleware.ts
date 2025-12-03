import { getPresetInfo } from 'api';

export async function getPresetInfoMiddleware(preset: string) {
  if (isStandalone) {
    return {
      options: {
        skin: 'default',
      }
    };
  }

  return await getPresetInfo(preset);
}
