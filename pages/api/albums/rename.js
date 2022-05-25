import excuteQuery from "../../../lib/db"
import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";
import {FirebaseAdmin} from "../../../firebase/FirebaseAdmin";

export default async function handler(req, res) {

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    if (req.body.id !== "1" && req.body.id !== 1) {
      FirebaseAdmin.firestore().collection("albums").doc(req.body.id).update({
        title: req.body.title
      })
      return res.json({}) 
    }
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
