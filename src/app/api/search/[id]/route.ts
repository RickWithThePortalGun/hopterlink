import request from "@/utils/http-request";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const uri = `/api/businesses/?search=${params.id}/`;
  console.log(uri)
  try {
    const result = await request.get(uri);
    const response = result.data.results;
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching business:", error);
    return NextResponse.json(error, { status: 400 });
  }
}
