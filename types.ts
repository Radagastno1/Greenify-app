// export type Garbage = {
//   Id: number;
//   UserId: number;
//   Url: string;
//   Material: string;
//   Date: string;
//   Points: number;
//   latitude: number;
//   longitude: number;
// };

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
  // trashList: Garbage[];
  animalImageUrl: string;
  isNightMode: boolean;
  level: number;
};
