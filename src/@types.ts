export type CurrentWeather = {
  is_day: 0 | 1;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type WeatherResp = {
  current_weather: CurrentWeather;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

export enum Themes {
  'default' = 'default',
  'cyberpunk' = 'cyberpunk',
}

type PresetValuesType = {
  collection: string;
  topic: string;
};

type PresetOptionsType = {
  width: number[];
  height: number[];
};

export type Preset = {
  id: string;
  values: {
    dynamic: PresetValuesType[];
    static: PresetValuesType[];
  };
  options?: {
    skin: string;
    dynamic: PresetOptionsType;
    static: PresetOptionsType;
  }
};

export type Media = {
  _id: string;
  id: string;
  type: 'static' | 'dynamic';
  collection: string;
  topic: string;
  orientation: 'h' | 'v' | 's';
  width: number;
  filename: string;
  path: string;
  size: number;
};
