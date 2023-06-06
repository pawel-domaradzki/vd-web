import { IUser } from "./shared";

export interface ITokenPayload {
  _id: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: ITokenPayload | IUser;
    }
  }
}
