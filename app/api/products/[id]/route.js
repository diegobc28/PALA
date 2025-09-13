import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";

// GET - Get product by ID (public endpoint)
export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const product = await Product.findOne({
      _id: id,
      isActive: true,
    })
      .populate({
        path: "storeId",
        select: "name slug whatsapp",
      })
      .lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      product: {
        ...product,
        store: product.storeId,
      },
    });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
