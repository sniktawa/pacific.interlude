import React, { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavComponent() {

    const router = useRouter()

    return (
        <div className={`d-flex justify-content-between align-items-center ${styles.navBar}`}>
            <div className={`d-flex align-items-end`} style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
              <Link href="/" passHref><a className={'hide-mobile'}>PACIFIC INTERLUDE</a></Link>
              <Link href="/clientele" passHref><a className={`${router.pathname === '/clientele' ? 'active' : ''}`}>CLIENTELE</a></Link>
              <Link href="/about" passHref><a className={`${router.pathname === '/about' ? 'active' : ''}`}>ABOUT</a></Link>
              <Link href="/contact" passHref><a className={`${router.pathname === '/contact' ? 'active' : ''}`}>CONTACT</a></Link>
               <Link href="/startproject" passHref><a className={`${router.pathname === '/startproject' ? 'active' : ''}`}>START PROJECT</a></Link>
            </div>
            <div className={`d-flex align-items-center h-100 ${styles.icon}`}>
              <img src="/images/LogoBlack.png" alt="Logo" width={32} height={32} onClick={() => router.push('/')} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )

}
