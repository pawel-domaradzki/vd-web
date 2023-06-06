import { Document } from "mongoose";
import { Request, Response, NextFunction } from "express";

export interface IUser extends Document {
  displayName: string;
  email: string;
  password: string;
  bookmarks: ResultsResponse[];
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ResultsResponse {
  adult: boolean;
  backdrop_path?: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids: [number];
  id: number;
  media_type: string;
  name?: string;
  title?: string;
  origin_country: [string];
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
}

export type RouteHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;
