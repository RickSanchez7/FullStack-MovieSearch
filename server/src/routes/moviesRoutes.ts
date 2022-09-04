import express from 'express';
import { userFavoriteMovies } from '../controllers/authController';
import { addMovie, removeMovie } from '../controllers/favoriteMovieController';
import protect from '../middleware/authMiddleware';
import currentUserMdw from '../middleware/current-user-mdw';

const Router = express.Router();

Router.post('/addmovie', currentUserMdw, protect, addMovie);
Router.post('/removemovie', currentUserMdw, protect, removeMovie);
Router.get('/getmovies', currentUserMdw, protect, userFavoriteMovies);

export default Router;
