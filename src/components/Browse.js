import React, { useEffect } from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useSciFiMovies from '../hooks/useSciFiMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useHorrorMovies from '../hooks/useHorrorMovies';
import useRomanticMovies from '../hooks/useRomanticMovies';
const Browse = () => {
  useNowPlayingMovies();
  useUpcomingMovies();
  usePopularMovies();
  useSciFiMovies();
  useTrendingMovies();
  useHorrorMovies();
  useRomanticMovies();
  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer/>
    </div>
  );
}

export default Browse;
