import {FirebaseAdmin} from "../../../firebase/FirebaseAdmin";

function compare(a, b) {
  if (!a?.position || !b?.position) return;
  // Use toUpperCase() to ignore character casing
  const bandA = parseInt(a.position);
  const bandB = parseInt(b.position);

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}

export async function getAlbums() {

  try {
    const albums = await FirebaseAdmin.getCollectionArray("albums");

    return await Promise.all(albums.map(async (album) => {
      const photos = await FirebaseAdmin.query("uploads", "album", "==", album.id);
      album['uploads'] = photos.length ? photos : [];
      album['uploads'] = album['uploads'].sort(compare)
      return album;
    }));
  } catch (error) {
    return [];
  }

}


export default async function handler(req, res) {

  try {
    const result = await getAlbums();
    return res.json(result)
  } catch (e) {
    console.error(e)
    return res.status(500).json({})
  }
}
