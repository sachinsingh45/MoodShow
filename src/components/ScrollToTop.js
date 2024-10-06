// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
    }, [pathname]); // Runs when the pathname changes

    return null; // No rendering necessary
};

export default ScrollToTop;
