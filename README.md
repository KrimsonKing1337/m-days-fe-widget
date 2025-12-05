# m-days-fe-widget

axios не обновлять, нужная версия: ^0.21.2.
дальше он использует fetch, который в старых браузерах не поддерживается.

Необходимо создать файл src/standalone.config.ts с пресетом. Например:


```
import type { Preset } from '@types';

export const preset: Preset = {
  id: 'default',
  options: {
    gui: {
      noGui: false,
      noMDays: false,
      weather: false,
      year: true,
      date: true,
      progressBar: true,
      days: true,
      percent: true,
      percentFull: true,
      watermark: true,
    },
  },
  values: {
    dynamic: [],
    static: [
      {
        collection: 'default',
        topic: 'common',
      }
    ]
  }
}
```
