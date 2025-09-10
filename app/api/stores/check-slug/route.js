import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Store from "@/models/Store";

// GET - Check if slug is available
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'tienda') {
      return NextResponse.json(
        { error: "Unauthorized - Tienda role required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter required" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Find user's current store to exclude from check
    const userStore = await Store.findOne({ userId: session.user.id });
    
    let query = { slug };
    
    // If user has a store and is checking their current slug, it's available
    if (userStore && userStore.slug === slug) {
      return NextResponse.json({ available: true });
    }

    const existingStore = await Store.findOne(query);
    const available = !existingStore;

    return NextResponse.json({ available });
  } catch (error) {
    console.error("Error checking slug:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}