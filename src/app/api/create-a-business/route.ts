import request from "@/utils/http-request";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const uri = `${process.env.NEXTAUTH_BACKEND_URL}api/businesses/`;
    const data = await req.formData();
    const response = await request.post(uri, data);
    if (!response.ok) {
      throw new Error(`Failed to submit form: ${response.statusText}`);
    }
    console.log(response)
    return NextResponse.json(response.data,{status:201});
  } catch (error: any) {
    console.log(error.response)
    return NextResponse.json(error, { status: 400 });
  }
}
