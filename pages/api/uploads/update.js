import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";

export default async function handler(req, res) {

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    const results = await excuteQuery({ query: `UPDATE uploads SET title='${req.body.title}', description='${req.body.description}', album='${req.body.album}' WHERE id='${req.body.id}'`, values: [] })
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
