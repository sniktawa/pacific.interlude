import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function NavComponent() {

    return (
        <div className={`d-flex justify-content-between align-items-center ${styles.navBar}`}>
            <div className={`d-flex align-items-end`} style={{ marginTop: '1.5rem' }}>
              <Link href="/" passHref><a className={'hide-mobile'}>PACIFIC INTERLUDE</a></Link>
              <Link href="/projects" passHref><a>PROJECTS</a></Link>
              <Link href="/about" passHref><a>ABOUT</a></Link>
              <Link href="/contact" passHref><a>CONTACT</a></Link>
            </div>
            <div className={`d-flex align-items-center h-100 ${styles.icon}`}>
              <img src="/images/LogoBlack.png" alt="Logo" width={32} height={32} />
            </div>
        </div>
    )

}