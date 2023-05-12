import React, {useEffect, useRef, useState} from "react";
import Modal from "react-modal/lib/components/Modal";
import styles from "../styles/Dashboard.module.css";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";
import PhotoComponent from "./PhotoComponent";
import imageCompression from 'browser-image-compression';
import {FirebaseClient} from "../firebase/FirebaseClient";

export default function AlbumComponent({album, albums, setAlbums}) {
    const [uploadModalOpen, setUploadModalOpen] = useState(false);

    const removePhoto = (photo) => {
        setAlbums((albums) =>
            albums.map((album) => {
                album.uploads = album.uploads.filter(
                    (upload) => upload.id !== photo.id
                );
                return album;
            })
        );
    };

    const addPhoto = (photo) => {
        setAlbums((albums) =>
            albums.map((a) => {
                if (photo.album === a.id) {
                    a.uploads = [...a.uploads.filter((upload) => upload.id !== photo.id), photo];
                }
                return a;
            })
        );
    };

    const renameAlbum = () => {
        Swal.fire({
            title: 'Name:',
            input: 'text',
            inputValue: album.title,
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: `Rename`,
            confirmButtonColor: '#000',
        }).then(async (result) => {
            if (result.isConfirmed && result?.value) {
                try {
                    if (album.id !== "1" && album.id !== 1) {
                        await FirebaseClient.update("albums", album.id, {title: result.value});
                    }
                    setAlbums((albums) => albums.map((a) => {
                        if (a.id === album.id) {
                            a.title = result.value;
                        }
                        return a;
                    }))
                } catch (e) {
                    console.error(e)
                }
            }
        })
    }

    const deleteAlbum = () => {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: `Delete`,
            confirmButtonColor: '#000',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    if (album.id !== "1" && album.id !== 1) {
                        await FirebaseClient.delete("albums", album.id);
                    }
                    setAlbums((albums) => albums.filter((a) => a.id !== album.id));
                } catch (e) {
                    console.error(e)
                }
            }
        })
    }


    return (
        <>
            <div className={`d-flex flex-column mt-4 ${styles.album}`}>
                <div
                    className={`d-flex w-100 justify-content-between align-items-center flex-wrap`}
                >
                    <h5>
                        {album.title}
                        {album.id !== '1' &&
                            <>
                                <button
                                    type="button"
                                    className={`btn-black`}
                                    style={{
                                        borderRadius: '50%',
                                        fontSize: '8px',
                                        position: 'absolute',
                                        marginTop: '-8px'
                                    }}
                                    onClick={renameAlbum}
                                >
                                    <i className="fas fa-pencil-alt"></i>
                                </button>
                                <button
                                    type="button"
                                    className={`btn-black`}
                                    style={{
                                        borderRadius: '50%',
                                        fontSize: '8px',
                                        position: 'absolute',
                                        marginTop: '-8px',
                                        marginLeft: '30px'
                                    }}
                                    onClick={deleteAlbum}
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </>
                        }
                    </h5>
                    <button
                        type="button"
                        className={`btn-black`}
                        onClick={() => setUploadModalOpen(true)}
                    >
                        Upload
                    </button>
                </div>
                <div
                    className={`d-flex`}
                    style={{
                        overflowX: album?.uploads && album.uploads.length < 1 ? "hidden" : "scroll",
                        overflowY: "hidden"
                    }}
                >
                    {album?.uploads &&
                        album.uploads.map((upload) => (
                            <PhotoComponent
                                key={`photo_${upload.id}_${Math.random()}`}
                                photo={upload}
                                removePhoto={removePhoto}
                                albums={albums}
                                addPhoto={addPhoto}
                            />
                        ))}
                </div>
            </div>
            <NewPhotoModal
                isOpen={uploadModalOpen}
                setOpen={setUploadModalOpen}
                album={album}
                addPhoto={addPhoto}
            />
        </>
    );
}

export const NewPhotoModal = (props) => {
    const [filesLength, setFilesLength] = useState(0);
    const [filesUploaded, setFilesUploaded] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        if (props?.photo) {
            reset(props?.photo);
        }

    }, []);

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        //setFilesLength(e.target.files.length)
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            setFilesLength(e.target.files.length)
        } else {
            console.error('Invalid file type');
        }
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "clamp(300px, 80vw, 400px)",
        },
    };

    const onClose = () => {
        props.setOpen(false);
        setFilesLength(0)
        setFilesUploaded(0)
        setSubmitted(false);
        reset();
    };
    const onSubmit = async (data) => {
        setSubmitted(true);
        console.log(data);
        try {
            if (!props?.photo) {
                const form = formRef.current;
                const fileInput = Array.from(form.elements).find(
                    ({name}) => name === "pic_src"
                );
    
                for (const file of fileInput.files) {
                    if (file.type.startsWith('image/')) {
                        const options = {
                            maxSizeMB: 5,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true
                        }
    
                        let f = file;
    
                        try {
                            f = await imageCompression(file, options);
                        } catch (error) {
                            console.log(error);
                            f = file;
                        }
    
                        data["album"] = props.album.id;
                        data["img_src"] = await FirebaseClient.uploadFile(f, file.name);
                        delete data["pic_src"];
    
                        const insert = await FirebaseClient.add("uploads", data);
    
                        if (props?.addPhoto) {
                            props.addPhoto(insert);
                        }
                        setFilesUploaded((filesUploaded) => filesUploaded + 1)
                    } else if (file.type.startsWith('video/')) {
                        // Video upload code...
                        data["album"] = props.album.id;
                        data["video_src"] = await FirebaseClient.uploadFile(file, file.name);
                        delete data["pic_src"];
                        const insert = await FirebaseClient.add("uploads", data);
                        if (props?.addPhoto) {
                            props.addPhoto(insert);
                        }
                        setFilesUploaded((filesUploaded) => filesUploaded + 1)
                    }
                }
                onClose();
            } else {
                await FirebaseClient.update("uploads", props.photo.id, data)
                props.removePhoto(props.photo)
                props.addPhoto(data)
                onClose()
            }
        } catch (e) {
            setSubmitted(false);
            console.error(e);
            if (e?.response && e?.response?.status === 400) {
                setError(Object.keys(e.response.data)[0], {
                    type: "manual",
                    message: e.response.data[Object.keys(e.response.data)[0]],
                });
            } else if (e?.response && e?.response?.status === 403) {
                window.localStorage.removeItem("token");
                window.location.href = "/dashboard";
            }
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onAfterOpen={() => reset()}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel="Example Modal"
            appElement={
                process.browser ? document.getElementById("main-container") : null
            }
        >
            <form
                ref={formRef}
                className={`d-flex w-100 flex-column`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={`d-flex justify-content-end`}>
                    <button onClick={onClose} className={"btn-black btn-close"}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>

                <div className={`d-flex flex-column mb-3`}>
                    <div className={`d-flex w-100 flex-column`}>
                        <label htmlFor="title" className={`form-label`}>
                            Title
                        </label>
                        <input
                            {...register("title", {required: false})}
                            id="title"
                            type="text"
                            placeholder="Progress Is Impossible Without Change"
                            className={`form-control ${errors?.title ? "is-invalid" : ""}`}
                        />
                    </div>
                    <div className={`d-flex w-100 flex-column mt-3`}>
                        <label htmlFor="description" className={`form-label`}>
                            Description
                        </label>
                        <input
                            {...register("description", {required: false})}
                            id="description"
                            type="text"
                            placeholder="Accept change, do not fight it."
                            className={`form-control ${
                                errors?.description ? "is-invalid" : ""
                            }`}
                        />
                    </div>

                </div>
                {!props?.photo ? (
                    <div className={`d-flex flex-column mb-3`}>
                        <div className={`d-flex flex-column`}>
                            <label htmlFor="pic_src" className={`form-label`}>
                                Image or Video*
                            </label>
                            <input
                                {...register("pic_src", {required: false})}
                                id="pic_src"
                                type="file"
                                multiple={true}
                                accept="image/*,video/*"
                                placeholder="https://imgur.com/4a4x8a"
                                className={`form-control ${
                                    errors?.pic_src ? "is-invalid" : ""
                                }`}
                                onChange={handlePicChange}
                            />
                            {errors?.pic_src && (
                                <label style={{color: "red"}}>
                                    {errors?.pic_src?.message}
                                </label>
                            )}
                        </div>
                        {submitted &&
                            <div className={`d-flex flex-column w-100 mt-3`}>
                                <label>Uploading ({Math.round((filesUploaded / filesLength) * 100)}%)</label>
                                <div className="progress">
                                    <div className="progress-bar bg-black" role="progressbar"
                                         style={{width: `${Math.round((filesUploaded / filesLength) * 100)}%`}}
                                         aria-valuenow={Math.round((filesUploaded / filesLength) * 100)}
                                         aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        }
                    </div>
                ) : (
                    <>
                        <div className={`d-flex w-100 flex-column mt-3`}>
                            <label htmlFor="position" className={`form-label`}>
                                Position
                            </label>
                            <input
                                {...register("position", {required: false})}
                                id="position"
                                type="number"
                                min={0}
                                step={1}
                                placeholder="1"
                                className={`form-control ${
                                    errors?.position ? "is-invalid" : ""
                                }`}
                            />
                        </div>
                        <br/>
                        <div className={`d-flex flex-column mb-3`}>
                            <label htmlFor="album" className={`form-label`}>
                                Album*
                            </label>
                            <select
                                {...register("album", {required: true})}
                                id="album"
                                className={`form-select ${errors?.album ? "is-invalid" : ""}`}
                            >
                                {props.albums.map((album) => (
                                    <option
                                        key={"album_" + album.id}
                                        value={album.id}
                                        selected={album.id === props.photo.album}
                                    >
                                        {album.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>

                )}
                <div className={`d-flex w-100 justify-content-center mt-3`}>
                    <button
                        type="submit"
                        className="btn-black"
                        disabled={!props?.photo && filesLength < 1 || submitted}
                    >
                        {props?.photo ? "Update" : "Upload"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};
