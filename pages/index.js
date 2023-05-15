import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';
import axios from 'axios'
import NavComponent from '../components/NavComponent';
import useWindowDimensions from './../components/DimensionsHook';
import { use100vh } from 'react-div-100vh'

export default function Home() {

  const hh2 = use100vh()
  const [loadedUrls, setLoadedUrls] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [albums, setAlbums] = useState(false)
  const { height, width } =  useWindowDimensions();


  useEffect(() => {
    if (typeof document != 'undefined') {
      window.addEventListener('wheel', listenToScroll)
    }
  }, [])

  const listenToScroll = (e) => {
    const track = document.getElementsByClassName('splide__list')[0]

    if (e?.deltaY && e.deltaY > 0) {
      var ev = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "ArrowRight", char : "ArrowRight", shiftKey : false});
      if (track) {
        track.dispatchEvent(ev);
      }
    } else if (e?.deltaY && e.deltaY < 0) {
      var ev = new KeyboardEvent("keydown", {bubbles : true, cancelable : true, key : "ArrowLeft", char : "ArrowLeft", shiftKey : false});
      if (track) {
        track.dispatchEvent(ev);
      }
    }
  }

  const fetchAlbums = async () => {
    try {
      const res = await axios.get('/api/albums/fetch');
      setAlbums(res.data);
      const uploads = res.data[0]?.uploads || [];
      const loadPromises = uploads.map((upload) => {
        return new Promise((resolve) => {
          if (upload.img_src) {
            const img = new Image();
            img.src = upload.img_src;
            img.onload = () => {
              if (!loadedUrls.includes(upload.img_src)) {
                setLoadedUrls((prevUrls) => [...prevUrls, upload.img_src]);
              }
              resolve();
            };
          } else if (upload.video_src) {
            const video = document.createElement('video');
            video.src = upload.video_src;
  
            const loadPromise = new Promise((resolve, reject) => {
              video.addEventListener('loadeddata', () => {
                if (!loadedUrls.includes(upload.video_src)) {
                  setLoadedUrls((prevUrls) => [...prevUrls, upload.video_src]);
                }
                resolve();
              });
  
              video.addEventListener('error', () => {
                resolve();
              });
            });
  
            if (isMobile) {
              resolve();
            }
  
            video.load();
  
            return loadPromise;
          } else {
            resolve();
          }
        });
      });
  
      Promise.all(loadPromises).then(() => {
        setLoaded(true);
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!albums) {
      fetchAlbums();
    }
  }, [])

  const renderDesktopImages = () => {
    return (
      <Splide className={`h-100 w-100 ${styles.sliderWide}`} options={{
        gap: '-40px',
        arrows: false,
        pagination: false,
        drag: 'free',
        height: '100%',
      }}>
        {albums[0].uploads.map((upload, index) => {
          if (upload.video_src) {
            return (
              <SplideSlide key={index}>
                <video
                  src={upload.video_src}
                  loop
                  muted
                  autoPlay
                  style={{ width: 'auto', height: '97%' }}
                  className={`p-4 pb-2`}
                  onLoadedMetadata={(e) => {
                    e.target.play();
                  }}
                />
              </SplideSlide>
            );
          } else if (upload.img_src) {
            return (
              <SplideSlide key={index}>
                <img src={upload.img_src} alt={upload?.title || upload.img_src} />
              </SplideSlide>
            );
          }
          return null;
        })}
      </Splide>
    );
  };
  
  const renderMobileImages = () => {
    return albums[0].uploads.map((upload, index) => {
      if (upload.video_src) {
        return (
          <div className={`d-flex w-100 p-2`} key={index}>
            <video src={upload.video_src} muted loop playsInline style={{ width: '100%', height: 'auto' }} 
            onLoadedMetadata={(e) => {
              e.target.play();
            }} />
          </div>
        );
      } else if (upload.img_src) {
        return (
          <div className={`d-flex w-100 p-2`} key={index}>
            <img src={upload.img_src} alt={upload?.title || upload.img_src} style={{ width: '100%', height: 'auto' }} />
          </div>
        );
      }
      return null;
    });
  };

  const renderProgressBar = () => {
    const progress = Math.round(((loadedUrls.length / albums[0].uploads.length) * 100) / 10);
    const blocks = []

    for (var i = 0; i < progress; i++) {
      blocks[i] = i
    }

    return (
      <div className={`loadingScreen justify-content-center align-items-center ${loadedUrls.length == albums[0].uploads.length ? "loadingScreenFinish" : ""}`} onAnimationEnd={() => setLoaded(true)}>
        <div className={`d-flex w-100 flex-column text-center`}>
          <h3 style={{ color: 'rgb(25, 25, 110)', letterSpacing: '-2px' }}>Progress Is Impossible Without Change</h3>
          <div className={`d-flex ${styles.progressBar}`}>
            {blocks.map((b) => (
              <div key={b} className={`d-flex`}>
              </div>
            ))}
          </div>
         </div>
      </div>
    )
  }

  if (!albums) return <></>

  const isMobile = width < 620 || (typeof document != 'undefined' && window.innerWidth < 620);

  return (
    <>
    <div className="grain"></div>
    <div className={styles.container + " loadingScreen"} style={{ height: isMobile ? hh2 : '100vh' }}>
      <Head>
        <title>Pacific Interlude</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      {!loaded && renderProgressBar()}

      <div className={`d-flex w-100 h-100 flex-column ${styles.body}`}>
        <NavComponent />
        <div className={`h-100 d-100 ${isMobile ? 'd-flex flex-column m-1' : ''}`} style={{ maxHeight: 'calc(100% - 3rem)', overflowY: isMobile ? 'scroll' : 'hidden' }}>
          {isMobile ? renderMobileImages() : renderDesktopImages()}
        </div>
      </div>
    </div>
    </>
  )
}
