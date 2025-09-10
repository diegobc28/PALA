import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Store from "@/models/Store";

// GET - Get store by slug (public endpoint)
export async function GET(req, { params }) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const store = await Store.findOne({ 
      slug, 
      isActive: true 
    }).populate('userId', 'name email');

    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ store });
  } catch (error) {
    console.error("Error getting store by slug:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}