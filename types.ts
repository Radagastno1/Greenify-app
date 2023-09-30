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

export class Garbage {
  constructor(
    public id: number,
    public userId: number,
    public url: string,
    public material: string,
    public latitude: number,
    public longitude: number,
    public date: string,
    public points: number
  ) {}
}


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
  level:number;
};
