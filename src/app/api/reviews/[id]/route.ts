import axios from "axios";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();
  console.log(body);
  const { id } = params;
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URL}api/businesses/${id}/reviews`;
  console.log("Review endpoint hit");
  try {
    const reviews = await request.post(uri, {
      rating: body.stars,
      comment: body.content,
    });
    console.log("Reviews endpoint: ", reviews);
    return NextResponse.json(reviews.data);
  } catch (error) {
    console.log("Error found: ", error);
    return NextResponse.json(
      { message: "Your review was not submitted." },
      { status: 404 },
    );
  }
}

export async function GET() {}
