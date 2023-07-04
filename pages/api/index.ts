import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  location: string | undefined;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST" && req.body.code === process.env.SECRET_CODE) {
    res.status(200).json({ location: process.env.SECRET_LOCATION });
  }
  res.status(500).json({ location: undefined, error: "Invalid code" });
}
