import {getAlbums} from "../albums/fetch";
import {FirebaseAdmin} from "../../../firebase/FirebaseAdmin";

export default async function handler(req, res) {

  try {
    await FirebaseAdmin.auth().verifyIdToken(req.headers["authorization"]);

    let position = req?.body?.position ? parseInt(req.body.position) : undefined;

    if (position) {
      let albumPhotosResult = await getAlbums();
      albumPhotosResult = albumPhotosResult.find(({id}) => id == req.body.album);
      if (albumPhotosResult && albumPhotosResult?.uploads && albumPhotosResult.uploads.length) {
        await Promise.all(albumPhotosResult["uploads"].map(async (photoResult) => {
          if (parseInt(photoResult.position) >= position) {
            await FirebaseAdmin.firestore().collection("uploads").doc(photoResult.id).update({
              position: parseInt(photoResult.position) + 1
            })
          }
        }))
      }
    }

    await FirebaseAdmin.firestore().collection("uploads").doc(req.body.id).update({
      title: req.body.title,
      description: req.body.description,
      album: req.body.album,
      ...(position && { position: parseInt(position) })
    })

    const result = await FirebaseAdmin.firestore().collection("uploads").doc(req.body.id).get();
    return res.json({id: req.body.id, ...result.data()})
  } catch (e) {
    console.error(e)
    return res.status(500).json({})
  }
}
