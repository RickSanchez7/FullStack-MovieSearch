import express from 'express';
import morgan from 'morgan';
import cookieSession from 'cookie-session';
import path from 'path';
import compression from 'compression';
// import helmet from 'helmet';

import 'express-async-errors';
import 'dotenv/config';

import useRouter from './routes/userRoutes';
import moviesRouter from './routes/moviesRoutes';
import errorHandler from './middleware/error-handler';
// import NotFoundError from './errors/not-found-error';

const app = express();
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
// app.use(helmet());
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'development',
    secure: false,
  })
);

// Routes
app.use('/api/v1/users', useRouter);
app.use('/api/v1/movies', moviesRouter);

//error handler
// app.all('*', async (req, res) => {
//   throw new NotFoundError();
// });

app.use(errorHandler);
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assests like main.js, or main.css file!
  app.use(express.static(path.join(__dirname, '/react-movie-db/build')));
  //Express will serve up the index.html file if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'react-movie-db', 'build', 'index.html')
    );
  });
}

export default app;
