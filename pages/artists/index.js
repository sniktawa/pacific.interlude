import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import NavComponent from '../../components/NavComponent';
import { use100vh } from 'react-div-100vh'
import useWindowDimensions from '../../components/DimensionsHook';
import emailjs from '@emailjs/browser';

import Modal from "react-modal";
import ReactDOM from 'react-dom';

export default function Talent() {
  const hh2 = use100vh()
  const { height, width } = useWindowDimensions();
  const isMobile = width < 620 || (typeof document != 'undefined' && window.innerWidth < 620);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const setWhatModalOpen = 'TwentyFive';

  return (
    <>
      <div className="grain"></div>
      <div className={styles.container + " loadingScreen formScreen"} style={{ height: isMobile ? hh2 : '100vh' }} id="main-content">
        <Head>
          <title>Pacific Interlude</title>
          <meta name="description" content="Talent" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </Head>

        <div className={`d-flex w-100 h-form flex-column ${styles.body}`} id="main-body">
          <NavComponent />
          <div className={`d-flex flex-column ${styles.about} new-container`} style={{ maxHeight: 'calc(100% - 3rem)' }}>
            <div className={`justify-content-center align-items-center new-titles`}>
              <h1 className="newExtraBold">Image and Creative Direction</h1>
            </div>
        

          <div className={`d-flex w-100 flex-column text-left artists pb-5`}> {/* line full width */}
            <div className="carousel-section">
              {/* Your Carousel Goes Here */}
            </div>
            <div className="responsive-container col-container">
              <div className="col text-left">
                {/* Your First Column Content */}
                <a href="/artists/arnie-watkins">
                  <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Farnie-watkins%2Fmain%2Farnie-photo.jpg?alt=media&token=11cc9eff-1ad9-48e7-96d3-3932d36c1dc4" />
                  <div className="artist-description pt-2 text-uppercase">
                    <div className="artist-name">Arnie Watkins</div>
                    <div className="artist-title">Photographer / Creative Director</div>
                  </div>
                </a>
              </div>
       
              <div className="col text-left">
                {/* Your First Column Content */}
                <a href="/artists/andrew-russell">
                  <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Fmain%2FPNG%20image%202.png?alt=media&token=8e8a8d85-8b11-4b65-ad2b-ea8c68f2d6c2" />
                  <div className="artist-description pt-2 text-uppercase">
                    <div className="artist-name">Andrew Russell</div>
                    <div className="artist-title">Photographer</div>
                  </div>
                </a>
              </div>
              
              <div className="col text-left">
              
              </div>

              <div className="col text-left">
              
              </div>

            </div>
          </div>
        </div>
      </div>

      </div>

      <style jsx>{`
        .carousel-section {
          width: 100%;
          // Add styles for your carousel section
        }
        .responsive-container {
          display: flex;
          flex-wrap: wrap;
        }
        .new-container{
          margin-left:5rem;
          margin-right:5rem;
          margin-top:2rem;
        }
        .col-container{
          display: flex;
          margin-left: -1em;
          margin-right: -1em;
        }
        .col {
          overflow: hidden;
          flex: 1 0 calc(25% - 2em);  /* Assuming you want four columns */
          margin: 1em;
        }
        
        @media (max-width: 920px) {
          .col {
            flex: 1 0 calc(50% - 1em);  /* Two columns on medium-sized screens */
            margin: 0.5em;
          }
        }
        
        @media (max-width: 420px) {
          .col {
            flex: 1 0 100%;  /* One column on smaller screens */
            margin: 0.5em 0;
          }
          .new-container{
            margin-left:1rem;
            margin-right:1rem;
            margin-top:1rem;
          }
          .select-image, .col img {
              width: 100%;
              max-width: 100%;
              height: auto;
              display: block;
          }
          .col-container{
            display: flex;
            margin-left: 0em;
            margin-right: 0em;
          }
        }        
             
        .text-left {
          text-align:left;
        }
        .title-bold {
          font-weight:600;
        }
        h1 {
          font-weight:800;
        }
        .artist-name {
          font-family: 'FuturaTSNew', sans-serif;
          font-size: 1.4em;
        }

        .artist-description {
          padding-top:2px;
          text-transform: uppercase;
          font-weight:200;
          font-family: 'FuturaTSNewLight', sans-serif;
        }

        .new-titles{
          text-transform: uppercase;
          margin-top:2rem;
          margin-bottom:2rem;
        }
        .new-titles h1{
            margin-bottom:0;
        }
        .new-titles .newExtraBold{
          font-family: 'FuturaTSNewExtraBold', sans-serif;
        }
        .new-titles .newLight{
          font-family: 'FuturaTSNewLight', sans-serif;
        }
        .new-titles h2{
          font-family: 'FuturaTSNewLight', sans-serif;
          margin-bottom:1em;
          font-size:1.6em;
        }
        .newLargeTitle {
          font-size:2.75em;

        }

        .select-image, .col img {
          width: 100%;
          max-width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s; 
        }
        
        .select-image, .col img {
          cursor: pointer;
        }        
        .col a::before {
          content: " ";
          display: block;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          inset: 0 0 0 0;
          background: hsl(800 0% 4%);
          height: 2px;
          top: 100%;
          z-index: -1;
          transition: transform .3s ease;
        }
      `}</style>
    </>
  )
}