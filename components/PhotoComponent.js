import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { NewPhotoModal } from "./AlbumComponent";

export default function PhotoComponent({ photo, removePhoto, albums, addPhoto }) {

    const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const deletePhoto = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This is an irreversible action.",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
      denyButtonColor: "#000",
      confirmButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          axios.defaults.headers.common["authorization"] =
            window.localStorage.getItem("token");
          const res = await axios.post("/api/uploads/delete", { id: photo.id });
          removePhoto(photo);
        } catch (e) {
          console.error(e);
          Swal.fire({
            title: e?.response?.data?.message || "Something went wrong.",
            showConfirmButton: false,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            toast: true,
            position: "top-right",
          });
        }
      }
    });
  };

  return (
      <>
    <div className={`p-2 album-photo`}>
      <button
        type="button"
        className="btn-black btn-delete"
        style={{ borderRadius: "50%" }}
        onClick={deletePhoto}
      >
        <i className="fa fa-times" />
      </button>
      <button
        type="button"
        className="btn-black btn-modify"
        style={{ borderRadius: "50%" }}
        onClick={() => setUploadModalOpen(true)}
      >
        <i className="fa fa-bars" />
      </button>
      <img src={photo.img_src} loading="lazy" />
    </div>
    <NewPhotoModal isOpen={uploadModalOpen} setOpen={setUploadModalOpen} photo={photo} albums={albums} removePhoto={removePhoto} addPhoto={addPhoto} />
    </>
  );
}