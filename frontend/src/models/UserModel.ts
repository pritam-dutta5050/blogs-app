export interface UserModel {
  username: string;
  firstName: string;
  lastName?: string;
  _id: string;

  email?: string;
  phone?: string;
  gender?: string;
  bio?: string;
  country?: string;
  proffesion?: string;
}
