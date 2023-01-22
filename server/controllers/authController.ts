import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken';

// import catchAsync from '../utils/catchAsync';
import User from '../models/User';
import { RequestWithUser } from '../utils/typescriptHelpers';
import BadRequestError from '../errors/bad-request-error';

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, passwordChangedAt } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new BadRequestError('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    passwordChangedAt,
  });

  // create jwt
  const token = generateToken(user._id);

  // Store it on session object
  req.session = {
    jwt: token,
  };

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      favoriteMovies: user.favoriteMovies,
    });
  } else {
    throw new BadRequestError('Invalid user data');
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password, user.password))) {
    // create jwt
    const token = generateToken(user._id);

    // Store it on session object
    req.session = {
      jwt: token,
    };

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new BadRequestError('Invalid email or password');
  }
};

export const userProfile = async (req: RequestWithUser, res: Response) => {
  let user;
  if (req.session) {
    user = await User.findById(req.currentUser?.id);
  }

  if (!user) return res.send(null);

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    throw new BadRequestError('User not found');
  }
};

export const updateUserProfile = async (
  req: RequestWithUser,
  res: Response
) => {
  let user;
  if (req.session) {
    user = await User.findById(req.currentUser?.id);
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new BadRequestError('User not found');
  }
};

export const currentUser = async (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};

export const signOut = (req: Request, res: Response) => {
  req.session = null;

  res.send({ data: null });
};

export const userFavoriteMovies = async (
  req: RequestWithUser,
  res: Response
) => {
  let user;
  if (req.session) {
    user = await User.findById(req.currentUser?.id);
  }

  if (!user) return res.send(null);

  if (user) {
    res.send({
      favoriteMovies: user.favoriteMovies,
    });
  } else {
    throw new BadRequestError('User not found');
  }
};
