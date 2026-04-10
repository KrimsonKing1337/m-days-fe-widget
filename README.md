# m-days-fe-widget

### Описание

Апсайклинг-проект для поддержки максимального количества браузеров — как новых, так и старых. На данный момент реализована поддержка IE3+. В процессе поддержка ещё более старых браузеров.

#### m-days.ru для IE8+
#### m-days.ru/l для IE5+
#### m-days.ru/ai для IE3+

---

### Технические детали

axios не обновлять, нужная версия: ^0.21.2.
дальше он использует fetch, который в старых браузерах не поддерживается.

Далее, необходимо создать файл src/standalone.config.ts с пресетом. Например:


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
