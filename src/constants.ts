export const ItemTypes = {
  TILE: "tile",
};

const vals = [0, 64, 128, 192, 255];
let colors = [];
for (let i = 0; i < 125; i++) {
  let new_color = [];
  let __i = i;
  for (let j = 0; j < 3; ++j) {
    new_color.push(vals[__i % 5]);
    __i = Math.floor(__i / 5);
  }
  if (Math.max(...new_color) - Math.min(...new_color) < 128) {
    continue;
  } else {
    colors.push(new_color);
  }
}

export const COLORS = [...colors];

export const SIM_CONST = 10;

export enum LEVELS {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

export const IMAGES = {
  [LEVELS.EASY]: [
    {
      id: 1,
      name: "shade1",
      url: "/shade1.jpg",
    },
    { id:2,       name: "shade2",  url: "/shade2.jpg" },
    { id:3,       name: "shade3",  url: "/shade3.jpg" },
    { id:4,       name: "shade4",  url: "/shade4.jpg" },
    { id:5,       name: "shade5",  url: "/shade5.jpg" },
    { id:6,       name: "shade6",  url: "/shade6.jpg" },
    { id:7,       name: "shade7",  url: "/shade7.jpg" },
    { id:8,       name: "shade8",  url: "/shade8.jpg" },
    { id:9,       name: "shade9",  url: "/shade9.jpg" },
    { id: 10,       name: "shade10",  url: "/shade10.jpg" },
    { id: 11,       name: "shade11",  url: "/shade11.jpg" },
    { id: 12,       name: "shade12",  url: "/shade12.jpg" },
    { id: 13,       name: "shade13",  url: "/shade13.jpg" },
    { id: 14,       name: "shade14",  url: "/shade14.jpg" },
    { id: 15,       name: "shade15",  url: "/shade15.jpg" },
    { id: 16,       name: "shade16",  url: "/shade16.jpg" },
  ],
  [LEVELS.MEDIUM]: [],
  [LEVELS.HARD]: [],
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