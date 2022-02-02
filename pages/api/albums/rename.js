import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";

export default async function handler(req, res) {

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    if (req.body.id !== 1) {
      const results = await excuteQuery({ query: `UPDATE albums SET title='${req.body.title}' WHERE id='${req.body.id}'`, values: [req.body.title] })
      return res.json(results)
    }
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
