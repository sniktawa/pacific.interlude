import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Link from 'next/link';

export default function Home() {

  const [loadedUrls, setLoadedUrls] = useState([])
  const [loaded, setLoaded] = useState(false)

  const imgUrls = [
    '/images/8FCE305B-2EED-4E4E-BA32-ED1E64667C93.JPG',
    '/images/8H7A0006.jpg',
    '/images/000000190002.jpg',
    '/images/000000200001.jpg',
    '/images/000003190006.jpg',
    '/images/Dior-Flare.jpg',
    '/images/lonewolf.jpg',
    '/images/Malibu.jpg',
    '/images/SabinaBW.jpg',
    '/images/scan66.jpeg',
    '/images/Stthomas-waves.jpg',
  ]

  useEffect(() => {

  }, [])

  const renderImages = () => {
    return (
      <Splide className={`h-100 w-100 ${styles.sliderWide}`} onVisible={e => {
        // document.getElementById('img_' + e.index).classList.add('seen')
      }} onActive={e => {
        // document.getElementById('img_' + e.index).classList.add('seen')
      }} options={ {
        gap   : '-40px',
        arrows : false,
        pagination : false,
        drag: 'free',
        height: '100%',
      } }>
      {
      imgUrls.map((url, index) => {
          return (
          <SplideSlide key={index}>
            <Image
              id={`img_${index}`}
              key={`img_${index}`}
              src={url}
              alt={url}
              unoptimized={true}
              priority={true}
              layout="fill"
              objectFit='contain'
              onLoadingComplete={() => {
                if (!loadedUrls.includes(url)) {
                  setLoadedUrls((loadedUrls) => [...loadedUrls.filter(x => x !== url), url])
                }
              }}
            />
          </SplideSlide>
        )})
      }
    </Splide>
    )
  }

  const renderProgressBar = () => {
    const progress = Math.round(((loadedUrls.length / imgUrls.length) * 100) / 10);
    const blocks = []

    for (var i = 0; i < progress; i++) {
      blocks[i] = i
    }

    return (
      <div className={`loadingScreen justify-content-center align-items-center ${loadedUrls.length == imgUrls.length ? "loadingScreenFinish" : ""}`} onAnimationEnd={() => setLoaded(true)}>
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

  return (
    <div className={styles.container + " loadingScreen"}>
      <Head>
        <title>Pacific Interlude</title>
        <meta name="description" content="Generated by create next app" />
        
      </Head>

      {!loaded && renderProgressBar()}

      <div className={`d-flex w-100 h-100 flex-column ${styles.body}`}>
        <div className={`d-flex justify-content-between align-items-center ${styles.navBar}`}>
            <div className={`d-flex align-items-end`} style={{ marginTop: '1.5rem' }}>
              <Link href="/" passHref><a className={'hide-mobile'}>PACIFIC INTERLUDE</a></Link>
              <Link href="/" passHref><a>PROJECTS</a></Link>
              <Link href="/" passHref><a>CONTACT</a></Link>
              <Link href="/" passHref><a>ABOUT</a></Link>
            </div>
            <div className={`d-flex align-items-center h-100 ${styles.icon}`}>
              <Image
                loading="lazy"
                src={'/images/LogoBlack.png'}
                alt={'Logo'}
                width={32}
                height={32}
              />
            </div>
        </div>
        <div className={`h-100 d-100 ${loadedUrls.length != imgUrls.length ? "hide" : ""}`}>
          {renderImages()}
        </div>
      </div>

    </div>
  )
}
