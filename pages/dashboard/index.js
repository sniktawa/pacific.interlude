import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import LoginComponent from '../../components/LoginComponent';
import Swal from 'sweetalert2';
import AlbumComponent from '../../components/AlbumComponent';
import {FirebaseClient} from "../../firebase/FirebaseClient";
import axios from "axios";

export default function Dashboard() {

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const [albums, setAlbums] = useState(null)

    const fetchAlbums = async () => {
        try {
            const res = await axios.get("/api/albums/fetch");
            console.log(res.data)
            setAlbums(res.data);
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (!albums) fetchAlbums();
        if (typeof document != 'undefined') {
            document.getElementById('root').classList.remove('overflowHide')
        }
    }, [])


    if (!FirebaseClient?.auth()?.currentUser) {
        return <LoginComponent />
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
                    await FirebaseClient.add("albums", { title: result.value });
                    fetchAlbums()
                } catch (e) {
                    console.error(e);
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