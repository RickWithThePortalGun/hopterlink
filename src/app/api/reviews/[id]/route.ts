import { NextResponse } from "next/server";
import request from "@/utils/http-request";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import axios from "axios";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  const { id } = params;
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/businesses/${id}/reviews`;
  const reviews = await axios.post(uri,{rating:body.stars,comment:body.content},{headers:{
    "Authorization":`Token ${session?.access_token}`
  }});
  console.log("Reviews endpoint: ",reviews)

  if (reviews) {
    console.log("Reviews endpoint: ",reviews)
    return NextResponse.json(reviews.data);
  } else {
    return NextResponse.json(
      { message: "Your review was not submitted." },
      { status: 404 },
    );
  }
}

export async function GET(){
  
}
