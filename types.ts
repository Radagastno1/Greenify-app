export type Trash = {
  id: number;
  url: string;
  material: string;
  location: Location;
  date: string;
  point: number;
};

export type User = {
  id: number;
  username: string;
  password: string;
  points: number;
  memberSince: string;
  isLoggedIn: boolean;
  trashList: Trash[];
  animalImageUrl: string;
  isNightMode: boolean;
};

export type Location = {
  longitude: number;
  latitude: number;
};
