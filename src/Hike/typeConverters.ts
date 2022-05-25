import { Hike } from './types';

export const toHikes = (newHikes: []): Hike[] => {
  const hikes: Hike[] = [];
  newHikes.forEach((hike) => {
    hikes.push(new Hike(hike));
  });

  return hikes;
};
