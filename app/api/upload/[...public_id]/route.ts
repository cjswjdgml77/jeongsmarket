import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

interface IParams {
  params: {
    public_id: string;
  };
}
export async function DELETE(request: Request, { params }: IParams) {
  const public_id = params.public_id;
  const sha1 = crypto.createHash("sha1");
  const time = new Date().getTime();
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  sha1.update(`public_id=${public_id}&timestamp=${time}${apiSecret}`);
  const signature = sha1.digest("hex");
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/destroy`,
      {
        public_id,
        api_key: `${process.env.CLOUDINARY_API_KEY}`,
        timestamp: time,
        signature,
      }
    );
    return NextResponse.json("success");
  } catch (e) {
    return NextResponse.error();
  }
}
