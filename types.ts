export type Garbage = {
  id: number;
  userId: number;
  url: string;
  material: string;
  latitude: number;
  longitude: number;
  date: string;
  points: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  points: number;
  memberSince: string;
  isLoggedIn: boolean;
  animalImageUrl: string;
  isNightMode: boolean;
  level: number;
};

export type MaterialInfo = {
  id: number;
  material: string;
  description: string;
  source: string;
  yearsInNature: string;
};
