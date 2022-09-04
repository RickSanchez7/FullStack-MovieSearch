import React from 'react';
import { mount, shallow } from 'enzyme';
import moxios, { wait } from 'moxios';
import { act } from 'react-dom/test-utils';

import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Featured from '../../components/Featured/Featured';
import Loading from '../../components/Loading/Loading';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

const server = setupServer(
  rest.get(`https://api.themoviedb.org/3/trending/all/day`, (req, res, ctx) => {
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

// describe('Featured', () => {
//   let wrapped;
//   beforeEach(() => {
//     const trending = 'trending';
//     const mediaType = 'all';
//     wrapped = mount(<Featured headTitle={trending} mediaType={mediaType} />);
//   });
//   afterEach(() => {
//     wrapped.unmount();
//   });

//   it('renders', () => {
//     expect(wrapped).not.toBeNull();
//   });

//   it('renders loading', () => {
//     expect(wrapped.find(Loading).length).toEqual(1);
//   });
// });

// const mockData = {
//   data: {
//     results: [
//       {
//         original_language: 'en',
//         original_title: 'The Ice Road',
//         poster_path: '/pj6UQPrtmC0snzPeU1HUhGWTgz6.jpg',
//         video: false,
//         vote_average: 6.4,
//         overview:
//           'After a remote diamond mine collapses in far northern Canada, an ice road driver must lead an impossible rescue mission over a frozen ocean to save the trapped miners.',
//         release_date: '2021-06-25',
//         vote_count: 9,
//         id: 646207,
//         backdrop_path: '/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg',
//         title: 'The Ice Road',
//         genre_ids: [28, 53],
//         adult: false,
//         popularity: 86.862,
//         media_type: 'movie',
//       },
//     ],
//   },
// };

// describe('Featured with Movie data', () => {
//   let wrapped;
//   const trending = 'trending';
//   const mediaType = 'all';
//   const timeUrl = 'day';
//   beforeEach(() => {
//     // moxios.install();
//     // moxios.stubRequest(
//     //   `https://api.themoviedb.org/3/trending/all/day?api_key=5c0a2ae809c32f7ca6cfcca8958e40b2`,
//     //   // /org.*/,
//     //   // fetchFeatured(`trending/${mediaType}/${timeUrl}`),
//     //   {
//     //     status: 200,
//     //     response: {
//     //       data: [
//     //         {
//     //           original_language: 'en',
//     //           original_title: 'The Ice Road',
//     //           poster_path: '/pj6UQPrtmC0snzPeU1HUhGWTgz6.jpg',
//     //           video: false,
//     //           vote_average: 6.4,
//     //           overview:
//     //             'After a remote diamond mine collapses in far northern Canada, an ice road driver must lead an impossible rescue mission over a frozen ocean to save the trapped miners.',
//     //           release_date: '2021-06-25',
//     //           vote_count: 9,
//     //           id: 646207,
//     //           backdrop_path: '/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg',
//     //           title: 'The Ice Road',
//     //           genre_ids: [28, 53],
//     //           adult: false,
//     //           popularity: 86.862,
//     //           media_type: 'movie',
//     //         },
//     //       ],
//     //     },
//     //   }
//     // );
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         data: () => Promise.resolve(mockData),
//       })
//     );
//   });
//   // afterEach(() => {
//   //   moxios.uninstall();
//   //   // jest.resetAllMocks();
//   // });

//   it('has a Head Title', async (done) => {
//     // moxios.wait(() => {
//     //   let request = moxios.requests.get(
//     //     'get',
//     //     // `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}`
//     //     fetchFeatured(`trending/${mediaType}/${timeUrl}`)
//     //   );
//     //   request
//     //     .respondWith({
//     //       status: 200,
//     //       response: [
//     //         {
//     //           original_language: 'en',
//     //           original_title: 'The Ice Road',
//     //           poster_path: '/pj6UQPrtmC0snzPeU1HUhGWTgz6.jpg',
//     //           video: false,
//     //           vote_average: 6.4,
//     //           overview:
//     //             'After a remote diamond mine collapses in far northern Canada, an ice road driver must lead an impossible rescue mission over a frozen ocean to save the trapped miners.',
//     //           release_date: '2021-06-25',
//     //           vote_count: 9,
//     //           id: 646207,
//     //           backdrop_path: '/5MlvT4DZIdkpb7A9t375HVoiJ1v.jpg',
//     //           title: 'The Ice Road',
//     //           genre_ids: [28, 53],
//     //           adult: false,
//     //           popularity: 86.862,
//     //           media_type: 'movie',
//     //         },
//     //       ],
//     //     })
//     //     .then(() => {
//     //       wrapped.update();
//     //       console.log(wrapped.debug());
//     //       done();
//     //     });
//     // });

//     // const trending = 'trending';
//     // const mediaType = 'all';
//     wrapped = mount(<Featured headTitle={trending} mediaType={mediaType} />);
//     // moxios.wait(() => {
//     //   wrapped.update();
//     //   // console.log(wrapped.debug());
//     //   done();
//     //   wrapped.unmount();
//     // });
//   });
// });

// const server = setupServer(
//   rest.get('https://api.themoviedb.org/3/trending/all/day', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json({ data: { results: mockData } }));
//   })
// );

// test('renders loading', () => {
//   const trending = 'trending';
//   const mediaType = 'all';
//   render(<Featured headTitle={trending} mediaType={mediaType} />);
//   expect(render(<Loading />));
// });

beforeAll(() => server.listen());
afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe('render Featured component', () => {
  const trending = 'trending';
  const mediaType = 'all';
  beforeEach(async () => {
    render(
      <Router>
        <Featured mediaType={mediaType} headTitle={trending} />
      </Router>
    );
    await waitForElementToBeRemoved(() => render(<Loading />));
  });

  test('renders headTitle', async () => {
    // const promise = Promise.resolve({ data: { results: mockData } });

    // const promise = jest.fn().mockResolvedValue(mockData);

    // axios.get.mockImplementationOnce(() => promise);
    // await act(() => sleep(500));

    // render(
    //   <Router>
    //     <Featured mediaType={mediaType} headTitle={trending} />
    //   </Router>
    // );
    // await promise();

    // await waitForElementToBeRemoved(() => <Loading />);

    // await waitFor(() => screen.debug());

    expect(screen.getByText('trending')).toBeInTheDocument();
    // console.log(await screen.findByTestId('header'));
  });
});
