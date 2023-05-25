// types/photo.ts
export type Photo = {
  id: number;
  file: string;
  caption: string;
};

export type Section = {
  heading: string;
  photos: Photo[];
};

export type Album = {
  id: string;
  title: string;
  cover: string;
  description: string;
  sections: Section[];
};
