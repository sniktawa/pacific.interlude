
import { useEffect, useState } from 'react'

function getWindowDimensions() {
  if (typeof document != 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  } else return {
    width: 0,
    height: 0
  }
}
  
  export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      
      if (typeof document != 'undefined') {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      } else return () => console.log('close')
    }, []);
  
    return windowDimensions;
  }