import { Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import User from '../models/User';

export const addMovie = async (req: Request, res: Response) => {
  const { title, image, link } = req.body;

  const movie = await User.findByIdAndUpdate(
    { _id: req.currentUser?.id },
    { $push: { favoriteMovies: { title, image, link } } }
  );

  if (!movie) {
    throw new BadRequestError('failed');
  }

  res.send(movie);
};

export const removeMovie = async (req: Request, res: Response) => {
  const { title, image, link } = req.body;

  const movie = await User.findByIdAndUpdate(
    { _id: req.currentUser?.id },
    { $pull: { favoriteMovies: { title, image, link } } }
  );

  if (!movie) {
    throw new BadRequestError('failed');
  }

  res.send(movie);
};
