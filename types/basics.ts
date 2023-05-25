// types/basics.ts
export type SocialLink = {
  name: string;
  handle: string;
  url: string;
};

export type Basics = {
  _id: string;
  name: string;
  titles: string[];
  abouts: string[];
  email: string;
  socialLinks: SocialLink[];
  location: string;
  website: string;
  contactIntro: string;
};
