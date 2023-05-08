import getCurrentUser from "@/app/actions/getCurrentUser";
import { imageData } from "@/app/components/Input/ImageUploader";
import client from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

interface Body {
  address: string;
  category: string[];
  description: string;
  price: string;
  images: imageData[];
  title: string;
}
export async function POST(req: Request) {
  const data: Body = await req.json();
  const currentUser = await getCurrentUser();
  if (
    !data.address ||
    !data.category ||
    data.category.length <= 0 ||
    !data.description ||
    !data.images ||
    data.images.length <= 0 ||
    !data.title ||
    !data.price
  )
    return new Response("", {
      status: 400,
      statusText: "Please Fill all the form required",
    });
  if (!currentUser?.id)
    return new Response("", {
      status: 403,
      statusText: "Please login to add your Item",
    });
  const response = await client.user.update({
    where: { id: currentUser.id },
    data: {
      usedItems: {
        create: {
          images: {
            create: data.images,
          },
          title: data.title,
          description: data.description,
          address: data.address,
          category: data.category,
          price: parseInt(data.price, 10),
        },
      },
    },
    include: {
      usedItems: true,
    },
  });
  return NextResponse.json({ response });
}
