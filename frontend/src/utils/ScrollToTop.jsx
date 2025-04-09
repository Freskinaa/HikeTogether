import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'



// ScrollToTop Component
// This component ensures that the window scrolls to the top
// every time the user navigates to a new page (route change).




const ScrollToTop = () => {
    const {pathname} = useLocation();
    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname])
  return null;
}

export default ScrollToTop;