import { NextResponse } from "next/server";
import request from "@/utils/http-request";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const uri = `api/businesses/${id}/review/`;
  const businesses = await request.post(uri);
  console.log(uri);
  console.log(businesses.data);

  if (businesses) {
    return NextResponse.json(businesses.data);
  } else {
    return NextResponse.json(
      { message: "Businesses not found" },
      { status: 404 },
    );
  }
}
