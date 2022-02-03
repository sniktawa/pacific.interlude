import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import NavComponent from '../../components/NavComponent';

export default function About() {

  return (
    <>
    <div className="grain"></div>
    <div className={styles.container + " loadingScreen"}>
      <Head>
        <title>Pacific Interlude</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <div className={`d-flex w-100 h-100 flex-column ${styles.body}`}>
        <NavComponent />
        <div className={`d-flex flex-column p-4 ${styles.about}`} style={{ maxHeight: 'calc(100% - 3rem)' }}>
          <p>pacific interlude focuses on developing your brand through thoughtful creative, digital, and visual strategies.</p>
          <p>our goal is to execute the highest standard of quality in regards to design, creation, and execution.</p>
          <p>we monitor current trends and evaluate high-converting growth strategies to keep your business relevant and prosperous.</p>
          <p>we provide full-service production and post-production workflow.</p>

          <br />
          <br />
          <h5>services</h5>
          <p>
            <i className="fas fa-angle-right"></i> content creation<br />
            <i className="fas fa-angle-right"></i> influencer marketing<br />
            <i className="fas fa-angle-right"></i> brand collaborations<br />
            <i className="fas fa-angle-right"></i> digital strategy<br />
            <i className="fas fa-angle-right"></i> pr
          </p>
        </div>
      </div>

      <div className={`plack`}>
        <a href="https://colbymchenry.com" target="_blank">Web Design by Colby McHenry</a>
      </div>
    </div>
    </>
  )
}