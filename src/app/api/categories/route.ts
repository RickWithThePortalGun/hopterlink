export const revalidate = 5;
import { NextRequest, NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function GET(req: NextRequest) {
  const uri = "/api/categories/";
  try {
    const result = await request.get(uri);
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
