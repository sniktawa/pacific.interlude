import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import Link from 'next/link';
import NavComponent from '../../../components/NavComponent';
import { use100vh } from 'react-div-100vh'
import useWindowDimensions from '../../../components/DimensionsHook';
import emailjs from '@emailjs/browser';

import Modal from "react-modal";
import ReactDOM from 'react-dom';


export default function Talent() {

  const hh2 = use100vh()
  const { height, width } =  useWindowDimensions();
  const isMobile = width < 620 || (typeof document != 'undefined' && window.innerWidth < 620);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const setWhatModalOpen = 'TwentyFive';

    // Reference to the email link DOM element
    const emailLinkRef = useRef(null);

    useEffect(() => {
      const emailLink = emailLinkRef.current;
  
      const handleEmailClick = (event) => {
        event.preventDefault();
        window.location.href = 'mailto:' + 'zoe' + '@' + 'pacificinterlude.com';
      };
  
      // Check if the element exists before adding the event listener
      if (emailLink) {
        emailLink.addEventListener('click', handleEmailClick);
      }

      return () => {
        if (emailLink) {
          emailLink.removeEventListener('click', handleEmailClick);
        }
      };
    }, []); 

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
          <div className={`d-flex flex-column ${styles.about} new-container`} style={{ maxHeight: 'calc(100% - 3em)' }}>
            <div className={`justify-content-center align-items-center new-titles`}>
                <h1 className="newExtraBold">Andrew Russell</h1>
                <h2>Photographer</h2>
            </div>

            <img src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Fbanner%2FPNGimage.png?alt=media&token=e4ffbc67-4dec-4309-ad06-6aa42053fd38"/>
                    
            <div className={`d-flex w-100 flex-column`}> {/* line full width */}
             
                <div className={`justify-content-center align-items-center new-titles top-line`}>
                  <div className="newLargeTitle newLight pt-4">
                    PHOTO
                  </div>
                </div>

                
                <div className="responsive-container col-container">

                    <div className="col text-left">
                        {/* Your First Column Content */}
                        <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Fsurf.png?alt=media&token=0e4605a7-8168-4b38-b381-890a35dade7d" />
                    </div>
            
                    <div className="col text-left">
                        {/* Your First Column Content */}
                        <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Ftravel.png?alt=media&token=3af0af3b-97f8-491e-aceb-0cdfaea9c858" />
                    </div>
                    
                    <div className="col text-left">
                        {/* Your First Column Content */}
                        <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Fwater.png?alt=media&token=695e7338-c508-4d20-989f-1b13bf5623c5" />
                    </div>

                    <div className="col text-left">
                        {/* Your First Column Content */}
                        <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Fboard.png?alt=media&token=9c70c787-4a00-42d5-8d73-6f28bfa8e02c" />
                    </div>

                    <div className="col text-left">
                        {/* Your First Column Content */}
                        <img className="select-image" src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Fandrew-russell%2Fswim.png?alt=media&token=b1a0c2db-8f09-446f-8ba4-cc53e072c2c0" />
                    </div>


                </div>

                <div className={`justify-content-center align-items-center new-titles top-line`}>
                </div>
                <div className="responsive-container artist-description col-container pb-5">
                    <div className="col">
                    {/* Your First Column Content */}
                    <div className="artist-biography">
                      
                        <div className="biography-title">BIOGRAPHY</div>
                        <div className="biography-text">Photographer and director Andrew Russell is known for his natural style of photography, influenced by light and movement. Born and raised in Los Angeles, he lives and breathes the California lifestyle, finding inspiration in the ocean, coastal landscapes and a classic approach to image making. When not in California, Andrew travels around the world shooting photos for brands and capturing the
different cultures and experiences he encounters.</div>

                        <div className="biography-text">Andrew's unique style and authenticity can be felt in both his personal and professional work. Whether shooting photography while traveling, or collaborating with brands on special projects that fit his lifestyle, for Andrew, every day is filled with creativity in one way or another.</div>
                        
                        <div className="biography-text">When he isn't directing and shooting campaigns, Andrew can be found surfing the California coast or driving through the hills, finding skate spots and chasing sunsets.</div>
                        
                        <div className="biography-title">Clients and collaborations include:</div>
                        <div className="biography-text">Samsonite, Sanuk, PacSun, Movado, Pura Vida, GoMacro, Suspicious Antwerp, LSKD, Otis Eyewear, Poppy America, Blenders Eyewear, Freestyle Watches, Pyzel Surfboards, Carver Skateboards, Bond- Eye Swim, Sympl, Raen Eyewear, Snap Wireless, One By One, Neven Eyewear, Aimant Watches, One Plus, Lids, Path Water, Visit Mammoth, Fashion Institute of Design and Merchandising</div>
                      </div>
                    </div>
                    <div className="col">
                    {/* Your Second Column Content */}
                      <div className="artist-biography">
                        <div className="biography-title">CONTACT AGENT</div>
                        <div className="biography-text"><a ref={emailLinkRef} className="email-link" href="#">zoe<span></span>@<span></span>pacificinterlude<span></span>.<span></span>com</a></div>

                        <div className="biography-title">INSTAGRAM</div>
                        <div className="biography-text"><a href="https://instagram.com/andrewrossrussell" target="_blank">@ANDREWROSSRUSSELL</a></div>
                      </div>

                    </div>
                </div>
            </div>

            </div>
    
        </div>
    </div>


        <style jsx>{`
          .email-link span { display: none; }
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
            flex: 1 0 calc(20% - 2em);  /* Assuming you want four columns */
            margin: 1em;
          }
          
          @media (max-width: 920px) {
            .col {
              flex: 1 0 calc(50% - 1em);  /* Two columns on medium-sized screens */
              margin: 0.5em;
            }
            .new-container{
              margin-left:2.5rem;
              margin-right:2.5rem;
              margin-top:1.5rem;
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
          .artist-description {
            padding-top:2px;
            text-transform: uppercase;
            font-weight:200;
            font-family: 'FuturaTSNewLight', sans-serif;
          }

          .artist-biography {
            text-transform: uppercase;
            font-weight:200;
            font-family: 'FuturaTSNewLight', sans-serif;
            
          }

          .artist-biography .biography-title{
            color: #9c9c9c;
            padding-top:1em;
          }
          .artist-biography .biography-text{
            padding-top:5px;
            padding-bottom:5px;
          }
  
          .select-image, .col img {
            width: 100%;
            margin-right: auto;
            margin-left: auto;
            max-width: 100%;
            height: auto;
            display: block;
          }
  
          .select-image, .col img {
            cursor: pointer;
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
          .top-line{
            border-top: 1px solid black;
            margin-top: 3.5rem;
          }

          
      `}</style>

    </>
  )
}
