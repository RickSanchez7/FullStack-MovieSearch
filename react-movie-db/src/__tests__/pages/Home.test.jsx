import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Home from '../../pages/Home';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(`trending/all/day`, (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json([
        {
          original_language: 'en',
          original_title: 'The Ice Road',
          poster_path: '/pj6UQPrtmC0snzPeU1HUhGWTgz6.jpg',
          video: false,
          vote_average: 6.4,
          overview:
            'After a remote diamond mine collapses in far northern Canada, an ice road driver must lead an impossible rescue mission over a frozen ocean to save the trapped miners.',
          release_date: '2021-06-25',
          vote_count: 9,
          id: 646207,
          backdrop_path: '/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg',
          title: 'The Ice Road',
          genre_ids: [28, 53],
          adult: false,
          popularity: 86.862,
          media_type: 'movie',
        },
      ])
    );
  })
);

test('render Loading', () => {
  render(
    <Router>
      <Home />
    </Router>
  );

  // const { baseElement } = render(<Loading />);

  // console.log(render(<Loading />));

  // expect(Loading).toBeInTheDocument();
});

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Home', () => {
  beforeEach(async () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    await waitForElementToBeRemoved(() => render(<Loading />));
  });

  expect(screen.getByText('Movie Search').toBeInTheDocument());
});
