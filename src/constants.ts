export const ItemTypes = {
  TILE: "tile",
};

export enum LEVELS {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
  EXPERT = "Expert",
}

export const IMAGES = {
  [LEVELS.EASY]: [
    {
      id: 1,
      name: "shade1",
      url: "/shade1.jpg",
    },
    { id: 2, name: "shade2", url: "/shade2.jpg" },
    { id: 3, name: "shade3", url: "/shade3.jpg" },
    { id: 4, name: "shade4", url: "/shade4.jpg" },
    { id: 5, name: "shade5", url: "/shade5.jpg" },
    { id: 6, name: "shade6", url: "/shade6.jpg" },
    { id: 7, name: "shade7", url: "/shade7.jpg" },
    { id: 8, name: "shade8", url: "/shade8.jpg" },
    { id: 9, name: "shade9", url: "/shade9.jpg" },
    { id: 10, name: "shade10", url: "/shade10.jpg" },
    { id: 11, name: "shade11", url: "/shade11.jpg" },
    { id: 12, name: "shade12", url: "/shade12.jpg" },
    { id: 13, name: "shade13", url: "/shade13.jpg" },
    { id: 14, name: "shade14", url: "/shade14.jpg" },
    { id: 15, name: "shade15", url: "/shade15.jpg" },
    { id: 16, name: "shade16", url: "/shade16.jpg" },
  ],
  [LEVELS.MEDIUM]: [
    {
      id: 1,
      name: "shade1",
      url: "/shade1-2.jpg",
    },
    { id: 2, name: "shade2", url: "/shade2-2.jpg" },
    { id: 3, name: "shade3", url: "/shade3-2.jpg" },
    { id: 4, name: "shade4", url: "/shade4-2.jpg" },
    { id: 5, name: "shade5", url: "/shade5-2.jpg" },
    { id: 6, name: "shade6", url: "/shade6-2.jpg" },
    { id: 7, name: "shade7", url: "/shade7-2.jpg" },
    { id: 8, name: "shade8", url: "/shade8-2.jpg" },
    { id: 9, name: "shade9", url: "/shade9-2.jpg" },
    { id: 10, name: "shade10", url: "/shade10-2.jpg" },
    { id: 11, name: "shade11", url: "/shade11-2.jpg" },
    { id: 12, name: "shade12", url: "/shade12-2.jpg" },
    { id: 13, name: "shade13", url: "/shade13-2.jpg" },
    { id: 14, name: "shade14", url: "/shade14-2.jpg" },
    { id: 15, name: "shade15", url: "/shade15-2.jpg" },
    { id: 16, name: "shade16", url: "/shade16-2.jpg" },
  ],
  [LEVELS.HARD]: [
    {
      id: 1,
      name: "shade1",
      url: "/shade1-3.jpg",
    },
    { id: 2, name: "shade2", url: "/shade2-3.jpg" },
    { id: 3, name: "shade3", url: "/shade3-3.jpg" },
    { id: 4, name: "shade4", url: "/shade4-3.jpg" },
    { id: 5, name: "shade5", url: "/shade5-3.jpg" },
    { id: 6, name: "shade6", url: "/shade6-3.jpg" },
    { id: 7, name: "shade7", url: "/shade7-3.jpg" },
    { id: 8, name: "shade8", url: "/shade8-3.jpg" },
    { id: 9, name: "shade9", url: "/shade9-3.jpg" },
    { id: 10, name: "shade10", url: "/shade10-3.jpg" },
    { id: 11, name: "shade11", url: "/shade11-3.jpg" },
    { id: 12, name: "shade12", url: "/shade12-3.jpg" },
    { id: 13, name: "shade13", url: "/shade13-3.jpg" },
    { id: 14, name: "shade14", url: "/shade14-3.jpg" },
    { id: 15, name: "shade15", url: "/shade15-3.jpg" },
    { id: 16, name: "shade16", url: "/shade16-3.jpg" },
  ],
  [LEVELS.EXPERT]: [
    {
      id: 1,
      name: "shade1",
      url: "/shade1-4.jpg",
    },
    { id: 2, name: "shade2", url: "/shade2-4.jpg" },
    { id: 3, name: "shade3", url: "/shade3-4.jpg" },
    { id: 4, name: "shade4", url: "/shade4-4.jpg" },
    { id: 5, name: "shade5", url: "/shade5-4.jpg" },
    { id: 6, name: "shade6", url: "/shade6-4.jpg" },
    { id: 7, name: "shade7", url: "/shade7-4.jpg" },
    { id: 8, name: "shade8", url: "/shade8-4.jpg" },
    { id: 9, name: "shade9", url: "/shade9-4.jpg" },
    { id: 10, name: "shade10", url: "/shade10-4.jpg" },
    { id: 11, name: "shade11", url: "/shade11-4.jpg" },
    { id: 12, name: "shade12", url: "/shade12-4.jpg" },
    { id: 13, name: "shade13", url: "/shade13-4.jpg" },
    { id: 14, name: "shade14", url: "/shade14-4.jpg" },
    { id: 15, name: "shade15", url: "/shade15-4.jpg" },
    { id: 16, name: "shade16", url: "/shade16-4.jpg" },
  ],
};

export type IMAGE = {
  id: string;
  name: string;
  url:string
}
export type POS = {
  x: string | number;
  y: string | number
}