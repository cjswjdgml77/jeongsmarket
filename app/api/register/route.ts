import client from "@/app/lib/prismadb";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await client.user.findUnique;
}
