import { preset as presetInfo } from 'standalone.config';

import { getPresetInfo } from 'api';

export async function getPresetInfoMiddleware(preset: string) {
  if (isStandalone) {
    return presetInfo;
  }

  return await getPresetInfo(preset);
}
