import { getRandomInt } from 'utils/getRandomInt';

export const getRandomMediaStandalone = (imgJson: string) => {
  const randomInt = getRandomInt(0, imgJson.length - 1);

  return `standalone/img_bg/${imgJson[randomInt]}`;
};
