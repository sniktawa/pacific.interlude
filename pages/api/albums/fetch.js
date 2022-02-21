import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";

export default async function handler(req, res) {

  try {
    const results = await excuteQuery({ query: `SELECT * FROM albums`, values: [] })
    let result = await Promise.all(results.map(async (album) => {
      album['uploads'] = await excuteQuery({ query: `SELECT * FROM uploads WHERE album='${album.id}' ORDER BY -position DESC`, values: []})
      return album;
    }))

    return res.json(result)
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
