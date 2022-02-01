import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";

export default async function handler(req, res) {

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    const results = await excuteQuery({ query: `INSERT INTO uploads (title, description, album, img_src) VALUES (?, ?, ?, ?)`, values: [req.body.title, req.body.description, req.body.album, req.body.img_src] })
    const result = await excuteQuery({ query: `SELECT * FROM uploads WHERE id='${results.insertId}'`, values: []});
    return res.json(result)
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
