import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const uri = `${process.env.NEXTAUTH_BACKEND_URL}api/businesses/${id}/remove_from_collection/`;
  try {
    const result = await request.post(uri, { id });
    console.log(result)
    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    console.log(error.response)
    return NextResponse.json(error, { status: 400 });
  }
}
