import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Store from "@/models/Store";
import Product from "@/models/Product";

// GET - Get products by store slug (public endpoint)
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

    // Find store by slug
    const store = await Store.findOne({
      slug,
      isActive: true,
    });

    if (!store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 });
    }

    // Get active products for this store
    const products = await Product.find({
      storeId: store._id,
      isActive: true,
    })
      .populate({
        path: "storeId",
        select: "name slug whatsapp",
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      products: products.map((product) => ({
        ...product,
        store: product.storeId,
      })),
    });
  } catch (error) {
    console.error("Error getting store products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
