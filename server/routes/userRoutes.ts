import express from 'express';
import { body } from 'express-validator';

import {
  currentUser,
  signin,
  signOut,
  signup,
  updateUserProfile,
  userProfile,
} from '../controllers/authController';

import protect from '../middleware/authMiddleware';
import currentUserMdw from '../middleware/current-user-mdw';
import validateRequest from '../middleware/validate-request';

const Router = express.Router();

Router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  signup
);
Router.post('/signin', signin);
Router.post('/signout', signOut);
Router.get('/currentuser', currentUserMdw, protect, currentUser);
Router.route('/profile')
  .get(currentUserMdw, protect, userProfile)
  .put(currentUserMdw, protect, updateUserProfile);

export default Router;
