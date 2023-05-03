import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  // const data = await client.usedItem.create({
  //     data: {
  //         userId: 'sdafdasfdasfdas',
  //         description:
  //     }
  // })
  return NextResponse.json("sdf");
}
