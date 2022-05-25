import jwt from 'jsonwebtoken';
import { TokenExpiredError } from "jsonwebtoken";
import {FirebaseAdmin} from "../../../firebase/FirebaseAdmin";

export default async function handler(req, res) {

  try {
    jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)
    const insert = await FirebaseAdmin.firestore().collection("albums").add(req.body);
    const result = await FirebaseAdmin.firestore().collection("albums").doc(insert.id).get();
    return res.json({id: insert.id, ...result.data()})
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(403).json({})
    }
    console.error(e)
    return res.status(500).json({})
  }
}
