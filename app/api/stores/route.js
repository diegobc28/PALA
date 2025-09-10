import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Store from "@/models/Store";

// GET - Get user's store
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'tienda') {
      return NextResponse.json(
        { error: "Unauthorized - Tienda role required" },
        { status: 401 }
      );
    }

    await connectMongo();
    
    const store = await Store.findOne({ userId: session.user.id });
    
    return NextResponse.json({ store });
  } catch (error) {
    console.error("Error getting store:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new store
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'tienda') {
      return NextResponse.json(
        { error: "Unauthorized - Tienda role required" },
        { status: 401 }
      );
    }

    const { name, description, whatsapp, slug } = await req.json();

    if (!name || !description || !whatsapp || !slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Check if user already has a store
    const existingStore = await Store.findOne({ userId: session.user.id });
    if (existingStore) {
      return NextResponse.json(
        { error: "User already has a store" },
        { status: 400 }
      );
    }

    // Check if slug is available
    const slugExists = await Store.findOne({ slug });
    if (slugExists) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    const store = new Store({
      userId: session.user.id,
      name,
      description,
      whatsapp,
      slug,
    });

    await store.save();

    return NextResponse.json({ store }, { status: 201 });
  } catch (error) {
    console.error("Error creating store:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update store
export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'tienda') {
      return NextResponse.json(
        { error: "Unauthorized - Tienda role required" },
        { status: 401 }
      );
    }

    const { name, description, whatsapp, slug } = await req.json();

    if (!name || !description || !whatsapp || !slug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Find user's store
    const store = await Store.findOne({ userId: session.user.id });
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }

    // Check if slug is available (if different from current)
    if (slug !== store.slug) {
      const slugExists = await Store.findOne({ slug });
      if (slugExists) {
        return NextResponse.json(
          { error: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    // Update store
    store.name = name;
    store.description = description;
    store.whatsapp = whatsapp;
    store.slug = slug;

    await store.save();

    return NextResponse.json({ store });
  } catch (error) {
    console.error("Error updating store:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}