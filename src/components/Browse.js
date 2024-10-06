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
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
const Browse = () => {
  useNowPlayingMovies();
  useUpcomingMovies();
  usePopularMovies();
  useSciFiMovies();
  useTrendingMovies();
  useHorrorMovies();
  useRomanticMovies();
  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch);
  return (
    <div>
      <ScrollToTop/>
      <Header />
      {showGPTSearch ? (
        <GPTSearch/>
      ) : (
        <div>
          <MainContainer />
          <SecondaryContainer/>
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default Browse;
