import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";

export default async function handler(req, res) {

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)

    let position = req?.body?.position;

    if (position) {
      const albumPhotosResult = await excuteQuery({ query: `SELECT * FROM uploads WHERE album='${req.body.album}' ORDER BY position DESC`, values: []})
      albumPhotosResult.map((photoResult) => {
        if (photoResult.position > position) {
          await excuteQuery({ query: `UPDATE uploads SET position='${photoResult.position + 1}' WHERE id='${photoResult.id}'`, values: [] })
        }
      })
    }


    const results = await excuteQuery({ query: `UPDATE uploads SET title='${req.body.title}', description='${req.body.description}', album='${req.body.album}'${position ? `, position=${position}` : ''} WHERE id='${req.body.id}'`, values: [] })
    const result = await excuteQuery({ query: `SELECT * FROM uploads WHERE id='${req.body.id}'`, values: []});
    return res.json(result)
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
