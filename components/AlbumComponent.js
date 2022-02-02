import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal/lib/components/Modal";
import styles from "../styles/Dashboard.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import PhotoComponent from "./PhotoComponent";

export default function AlbumComponent({ album, albums, setAlbums }) {
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
                axios.defaults.headers.common["authorization"] = window.localStorage.getItem("token");
                const res = await axios.post("/api/albums/rename", { id: album.id, title: result.value });
                setAlbums((albums) => albums.map((a) => {
                  if (a.id === album.id) {
                    a.title = result.value;
                  }
                  return a;
                }))
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
    <>
      <div className={`d-flex flex-column mt-4 ${styles.album}`}>
        <div
          className={`d-flex w-100 justify-content-between align-items-center flex-wrap`}
        >
          <h5>
            {album.title}
            {album.title !== 'homepage' &&
              <button
              type="button"
              className={`btn-black`}
              style={{ borderRadius: '50%', fontSize: '8px', position: 'absolute', marginTop: '-8px' }}
              onClick={renameAlbum}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            }
          </h5>
          <button
            type="button"
            className={`btn-black`}
            onClick={() => setUploadModalOpen(true)}
          >
            Upload Photo
          </button>
        </div>
        <div
          className={`d-flex`}
          style={{ overflowX: album?.uploads && album.uploads.length < 1 ? "hidden" : "scroll", overflowY: "hidden" }}
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
  const [picSrc, setPicSrc] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (props?.photo) {
      reset(props?.photo);
      setPicSrc(props.photo.img_src);
    }
  }, []);

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
    setPicSrc(null);
    setSubmitted(false);
    reset();
  };

  const handlePicChange = (e) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setPicSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    setSubmitted(true);
    try {
      if (picSrc && !props?.photo) {
        const form = formRef.current;
        const fileInput = Array.from(form.elements).find(
          ({ name }) => name === "pic_src"
        );
        const formData = new FormData();

        for (const file of fileInput.files) {
          formData.append("file", file);
        }

        formData.append("upload_preset", "pacific-interlude");

        var imgUploadData = await fetch(
          "https://api.cloudinary.com/v1_1/dbs8wu1fx/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        imgUploadData = await imgUploadData.json();

        if (imgUploadData?.error) {
          setError("pic_src", {
            type: "manual",
            message: imgUploadData?.error?.message,
          });
          setSubmitted(false);
          return;
        }

        setPicSrc(imgUploadData.secure_url);

        data["img_src"] = imgUploadData.secure_url;
        data["public_id"] = imgUploadData.public_id;
        data["album"] = props.album.id;

        axios.defaults.headers.common["authorization"] =
          window.localStorage.getItem("token");
        const res = await axios.post(`/api/uploads/create`, data);

        if (props?.addPhoto) {
          props.addPhoto(res.data[0]);
        }
        onClose();
      } else {
        axios.defaults.headers.common["authorization"] =
        window.localStorage.getItem("token");
        data['id'] = props.photo.id;
        const res = await axios.post(`/api/uploads/update`, data);
        props.removePhoto(props.photo)
        props.addPhoto(res.data[0])
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
              {...register("title", { required: false })}
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
              {...register("description", { required: false })}
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
                Image*
              </label>
              <input
                {...register("pic_src", { required: false })}
                id="pic_src"
                type="file"
                placeholder="https://imgur.com/4a4x8a"
                className={`form-control ${
                  errors?.pic_src ? "is-invalid" : ""
                }`}
                onChange={handlePicChange}
              />
              {errors?.pic_src && (
                <label style={{ color: "red" }}>
                  {errors?.pic_src?.message}
                </label>
              )}
            </div>
            {picSrc && (
              <div
                className={`d-flex justify-content-center align-items-center `}
                style={{
                  paddingLeft: "0.5rem",
                  marginTop: "1rem",
                  overflow: "scroll",
                  maxWidth: "100%",
                  maxHeight: "20vh",
                }}
              >
                <img src={picSrc} />
              </div>
            )}
          </div>
        ) : (
          <div className={`d-flex flex-column mb-3`}>
            <label htmlFor="album" className={`form-label`}>
              Album*
            </label>
            <select
              {...register("album", { required: true })}
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
        )}
        <div className={`d-flex w-100 justify-content-center mt-3`}>
          <button
            type="submit"
            className="btn-black"
            disabled={!props?.photo && !picSrc || submitted}
          >
            {props?.photo ? "Update" : "Upload"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
