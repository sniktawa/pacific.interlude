import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Link from 'next/link'
import axios from 'axios'
import NavComponent from '../components/NavComponent'
import useWindowDimensions from './../components/DimensionsHook'
import { use100vh } from 'react-div-100vh'

export default function Home() {
  const hh2 = use100vh()
  const [loadedUrls, setLoadedUrls] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [albums, setAlbums] = useState(false)
  const { height, width } =  useWindowDimensions()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      window.addEventListener('wheel', listenToScroll)
    }
  }, [])

  const listenToScroll = (e) => {
    const track = document.getElementsByClassName('splide__list')[0]

    if (e?.deltaY && e.deltaY > 0) {
      const ev = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "ArrowRight",
        char: "ArrowRight",
        shiftKey: false,
      })

      if (track) {
        track.dispatchEvent(ev)
      }
    } else if (e?.deltaY && e.deltaY < 0) {
      const ev = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: "ArrowLeft",
        char: "ArrowLeft",
        shiftKey: false,
      })

      if (track) {
        track.dispatchEvent(ev)
      }
    }
  }

  const fetchAlbums = async () => {
    try {
        const res = await axios.get("/api/albums/fetch")
        setAlbums(res.data)

        res.data[0].uploads.forEach((upload) => {
          let url = upload.img_src
          const img = new Image()
          img.src = url
          img.onload = () => {
            if (!loadedUrls.includes(url)) {
              setLoadedUrls((loadedUrls) => [...loadedUrls.filter(x => x !== url), url])
            }
          }
        })
    } catch (e) {
        console.error(e)
    }
  }

  useEffect(() => {
    if (!albums) {
      fetchAlbums()
    }
  }, [])

  const renderDesktopImages = () => (
    <Splide
      className={`h-100 w-100 ${styles.sliderWide}`}
      options={{
        gap: '-40px',
        arrows: false,

}
