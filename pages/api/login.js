import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { password } = req.body;
  try {
    if (password !== process.env.PASSWORD) {
        return res.status(400).json({ message: 'Invalid password.'})
    }

    let user = {
        username: 'pacific-interlude',
    };

    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        return res.json({ token });
    });
  } catch (e) {
    console.error(e)
    return res.status(401).json({ message: "Invalid credentials." });
  }
}