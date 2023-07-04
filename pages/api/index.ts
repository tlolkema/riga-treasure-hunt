import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  location?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.body.code === process.env.SECRET_CODE) {
    return res.status(200).json({ location: process.env.SECRET_LOCATION });
  }
  console.error(req.body.code);
  return res.status(500).json({ error: "Wrong phrase matey!" });
}
