import { getPresetInfo } from 'api';

export async function getPresetInfoMiddleware(preset: string) {
  if (isStandalone) {
    return {
      skin: 'default',
    };
  }

  return await getPresetInfo(preset);
}
