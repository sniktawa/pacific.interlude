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
                <h1 className="newExtraBold">Arnie Watkins</h1>
                <h2>Photographer</h2>
            </div>
          
            <video
                  src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Farnie-watkins%2Fgallery%2FNike-Gif.mov?alt=media&token=58bd618e-ae25-47d6-a8a6-9a130abce3b7"
                  loop
                  muted
                  autoPlay
                  playsInline
                  style={{ width: 'auto', height: '97%' }}
                  className={`pb-2`}
                  onLoadedMetadata={(e) => {
                    e.target.play();
                  }}
                  onError={(e) => {
                    console.error('Video error:', e);
                  }}
                />

            <div className={`d-flex w-100 flex-column`}> {/* line full width */}
             
                <div className={`justify-content-center align-items-center new-titles top-line`}>
                  <div className="newLargeTitle newLight pt-4">
                    FILM DIRECTION
                  </div>
                </div>
                <div className="responsive-container col-container">

                    <div className="col text-left">
                        {/* TL Column Content */}
                        <video
                            src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Farnie-watkins%2Fgallery%2FNike-Gif.mov?alt=media&token=58bd618e-ae25-47d6-a8a6-9a130abce3b7"
                            loop
                            muted
                            autoPlay
                            playsInline
                            style={{ width: '100%', height: 'auto' }}
                            className={`pb-2`}
                            onLoadedMetadata={(e) => {
                                e.target.play();
                            }}
                            onError={(e) => {
                                console.error('Video error:', e);
                            }}
                            />
                    </div>
            
                    <div className="col-wide text-left">
                        {/* TR Column Content */}
                        <video
                            src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Farnie-watkins%2Fgallery%2FAureum-web.mov?alt=media&token=029020f2-f2eb-4232-95b7-c95107354882"
                            loop
                            muted
                            autoPlay
                            playsInline
                            style={{ width: '100%', height: '89%' }}
                            className={`pb-2`}
                            onLoadedMetadata={(e) => {
                                e.target.play();
                            }}
                            onError={(e) => {
                                console.error('Video error:', e);
                            }}
                            />
                    </div>

                </div>

                <div className="responsive-container col-container">

                    <div className="col-wide text-left">
                        {/* BL Column Content */}
                        <video
                            src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Farnie-watkins%2Fgallery%2FBamba-Web.mov?alt=media&token=8b0596d2-83d3-4271-894c-368901512306"
                            loop
                            muted
                            autoPlay
                            playsInline
                            style={{ width: '100%', height: '88%' }}
                            className={`pb-2`}
                            onLoadedMetadata={(e) => {
                                e.target.play();
                            }}
                            onError={(e) => {
                                console.error('Video error:', e);
                            }}
                            />
                    </div>

                    <div className="col text-left">
                        {/* BR Column Content */}
                        <video
                            src="https://firebasestorage.googleapis.com/v0/b/pacifc-interlude-website.appspot.com/o/artists%2Farnie-watkins%2Fgallery%2FNIke-Web-Video.mp4?alt=media&token=33717bee-7ad0-4232-8e5e-696a10b06a5f"
                            loop
                            muted
                            autoPlay
                            playsInline
                            style={{ width: '100%', height: 'auto' }}
                            className={`pb-2`}
                            onLoadedMetadata={(e) => {
                                e.target.play();
                            }}
                            onError={(e) => {
                                console.error('Video error:', e);
                            }}
                            />
                    </div>


                </div>

                <div className={`justify-content-center align-items-center new-titles top-line`}>
                </div>
                <div className="responsive-container artist-description col-container pb-5">
                    <div className="col">
                    {/* Your First Column Content */}
                    <div className="artist-biography">
                      
                        <div className="biography-title">BIOGRAPHY</div>
                        <div className="biography-text">Arnie Watkins, an architect of visual sensations, is the CEO and director of Pacific Interlude, a Production Company that crafts immortal imprints in the fabric of brand identity.</div>

                        <div className="biography-text">With a voyeuristic eye, he captures the essence of timeless moments, turning ordinary scenes into extraordinary narratives.</div>
                        
                        <div className="biography-text">His art as a lifestyle photographer transcends the mundane, giving life to content that resonates, enchants, and endures.</div>
                        
                        <div className="biography-text">Connecting brands with their audience in the most intimate and authentic way, Arnie's creations are not just images but experiences – palpable, provocative, and perpetually fresh.</div>
                      </div>
                    </div>
                    <div className="col">
                    {/* Your Second Column Content */}
                      <div className="artist-biography">
                        <div className="biography-title">CONTACT AGENT</div>
                        <div className="biography-text"><a ref={emailLinkRef} className="email-link" href="#">zoe<span></span>@<span></span>pacificinterlude<span></span>.<span></span>com</a></div>

                        <div className="biography-title">INSTAGRAM</div>
                        <div className="biography-text"><a href="https://instagram.com/arniewatkins" target="_blank">@ARNIEWATKINS</a></div>
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
            flex: 1 0 calc(20% - 1em);
            margin: 1em;
          }
          .col-wide {
            overflow: hidden;
            flex: 1 0 calc(25% - 1em);
            margin: 1em;
          }
          
          @media (max-width: 920px) {
            .col {
              flex: 1 0 calc(50% - 1em);  /* Two columns on medium-sized screens */
              margin: 0.5em;
            }
            .col-wide {
              overflow: hidden;
              flex: 1 0 calc(50% - 1em);
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
            .col-wide {
              flex: 1 0 100%;
              margin: 1em;
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
