import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const uri = `${process.env.NEXTAUTH_BACKEND_URL}auth/registration/verify-email/`;
    const result = await axios.post(uri, {
      key: body.key,
    });
    return NextResponse.json(result.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}
