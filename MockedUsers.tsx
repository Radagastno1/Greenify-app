export interface User {
  id: number;
  username: string;
  points: number;
  memberSince: number;
}

export const users: User[] = [
  {
    id: 1,
    username: "cool_skräp_plockare",
    points: 1350,
    memberSince: 2023
  },
];
