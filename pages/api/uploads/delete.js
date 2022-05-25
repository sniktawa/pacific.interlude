import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";
import cloudinary from 'cloudinary'
import {FirebaseAdmin} from "../../../firebase/FirebaseAdmin";

export default async function handler(req, res) {
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_ID,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    let photo = await FirebaseAdmin.firestore().collection("uploads").doc(req.body.id).get();
    photo = photo.data();

    cloudinary.v2.api.delete_resources([photo.public_id], (result) => {
      console.log(result)
    });

    await FirebaseAdmin.firestore().collection("uploads").doc(req.body.id).delete();
    return res.json({});
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
