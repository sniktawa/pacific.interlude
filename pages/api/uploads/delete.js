import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";
import cloudinary from 'cloudinary'

export default async function handler(req, res) {
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_ID,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    const photoRow = await excuteQuery({ query: `SELECT * FROM uploads WHERE id=${req.body.id}`, values: []})

    cloudinary.v2.api.delete_resources([photoRow[0].public_id], (result) => {
      console.log(result)
    });

    const results = await excuteQuery({ query: `DELETE FROM uploads WHERE id='${req.body.id}'`, values: [] })
    return res.json(results)
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
