import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import {NewPhotoModal} from "./AlbumComponent";
import {FirebaseClient} from "../firebase/FirebaseClient";


export default function PhotoComponent({ photo, removePhoto, albums, addPhoto }) {

    const [uploadModalOpen, setUploadModalOpen] = useState(false);


    var media_src = null;

    const [isVideo, setIsVideo] = useState(false);
    const [mediaSrc, setMediaSrc] = useState(null);

    useEffect(() => {
        if(photo.video_src){
            setMediaSrc(photo.video_src);
            setIsVideo(true);
        } else {
            setMediaSrc(photo.img_src);
            setIsVideo(false);
        }
    }, [photo]);
   

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
          await FirebaseClient.delete("uploads", photo.id);
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
  
      {isVideo ? (
          <video src={mediaSrc} controls loading="lazy" style={{ width: 'auto', height: '100%' }}/>
      ) : (
          <img src={mediaSrc} loading="lazy" />
      )}
    </div>
    <NewPhotoModal isOpen={uploadModalOpen} setOpen={setUploadModalOpen} photo={photo} albums={albums} removePhoto={removePhoto} addPhoto={addPhoto} />
    </>
  );
}