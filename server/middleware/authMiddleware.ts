import { NextFunction, Response } from 'express';
// import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/bad-request-error';
// import NotAuthorizedError from '../errors/not-authorized-error';
// import User from '../models/User';
import { RequestWithUser } from '../utils/typescriptHelpers';

const protect = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // if (!req.currentUser) {
  //   throw new NotAuthorizedError();
  // }

  try {
    // Verification token
    // const decoded = jwt.verify(req.session?.jwt, process.env.JWT_SECRET!);

    // // Check if user still exists
    // let currentUser;
    // if (decoded) {
    //   currentUser = await User.findById((<any>decoded).id);
    // }
    // if (!currentUser) {
    //   throw new BadRequestError(
    //     'The user belonging to this id does no longer exist'
    //   );
    // }

    // // Check if user changed password after the token was issued
    // if (
    //   currentUser.changedPasswordAfter(
    //     currentUser.passwordChangedAt,
    //     (<any>decoded).iat
    //   )
    // ) {
    //   throw new BadRequestError(
    //     'User recently changed password! Please login again'
    //   );
    // }

    next();
  } catch (err) {
    throw new BadRequestError('Not authorized, no token');
  }
};

export default protect;
