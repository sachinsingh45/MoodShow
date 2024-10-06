import React from 'react'
import Header from './Header';
import MovieDetail from './MovieDetail';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Watch = () => {
  return (
    <div>
        <ScrollToTop/>
        <Header/>
        <MovieDetail/>
        <Footer/>
    </div>
  )
}

export default Watch;