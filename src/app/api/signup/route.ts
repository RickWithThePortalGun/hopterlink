import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const uri = `${process.env.NEXTAUTH_BACKEND_URL}auth/registration/`;
    const result = await axios.post(uri, {
      first_name: body.first_name,
      last_name: body.last_name,
      phoneNo: body.phoneNo,
      email: body.email,
      password1: body.password1,
      password2: body.password2,
    });
    return NextResponse.json(result.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(error, { status: 400 });
  }
}