import React, { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import styles from '../../styles/Dashboard.module.css'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import axios from 'axios'
import LoginComponent from '../../components/LoginComponent';
import Swal from 'sweetalert2';
import AlbumComponent from '../../components/AlbumComponent';

export default function Dashboard() {

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const [albums, setAlbums] = useState(null)

    const fetchAlbums = async () => {
        try {
            const res = await axios.get("/api/albums/fetch");
            setAlbums(res.data);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (!albums) fetchAlbums();
    }, [])


    if (typeof window !== 'undefined') {
        if (!window.localStorage.getItem('token')) {
            return <LoginComponent />
        }
    }

    const createAlbum = () => {
        Swal.fire({
            title: 'Name:',
            input: 'text',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: `Create`,
            confirmButtonColor: '#000',
        }).then(async (result) => {
           if (result.isConfirmed && result?.value) {
                try {
                    axios.defaults.headers.common["authorization"] = window.localStorage.getItem("token");
                    const res = await axios.post("/api/albums/create", { title: result.value });
                    fetchAlbums()
                } catch (e) {
                    console.error(e)
                    if (e?.response && e?.response?.status === 403) {
                        window.localStorage.removeItem("token")
                        window.location.href = "/dashboard"
                    }
                }
           }
        })
    }

    return (
        <div className={`d-flex w-100 flex-column dashboard`}>
            <div className={`d-flex w-100 justify-content-end mb-3`}>
                <button type="button" className="btn-black" onClick={createAlbum}>Create Album</button>
            </div>
            {albums && albums.map((album) => <AlbumComponent key={`album_${album.id}`} album={album} albums={albums} setAlbums={setAlbums} />) }
        </div>
    )
}