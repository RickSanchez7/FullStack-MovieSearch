import axios from 'axios';

export const fetchFeatured = async (url = '') => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/${url}?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};

export const fetchAll = async (url = '') => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}&language=en-US&query=${url}&page=1&include_adult=false`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};

export const FetchDetails = async (type, id) => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}&language=en-US&include_adult=false`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};

export const FetchCast = async (mediaType, id) => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}&language=en-US`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};

export const FetchNowPlaying = async (mediaType, link) => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/${mediaType}/${link}?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}&language=en-US&page=1`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};

export const FetchPopulars = async (mediaType, page, whatKind) => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/${mediaType}/${whatKind}?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}&language=en-US&page=${page}`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};

export const FetchRecommendations = async (mediaType, page, id) => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations?api_key=${process.env.REACT_APP_REACT_MOVIEDB_API}&language=en-US&page=${page}`,
    });
    return res;
  } catch (error) {
    /* eslint-disable-next-line */
    console.error(error);
  }
};
