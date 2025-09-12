import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import Store from "@/models/Store";

// GET /api/stores/my-products - Get all products for the authenticated tienda
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    await connectMongo();

    // Check if user is a tienda
    const user = await User.findById(session.user.id);
    if (user?.role !== 'tienda') {
      return NextResponse.json(
        { error: "Only store owners can access this endpoint" },
        { status: 403 }
      );
    }

    // Get user's store
    const store = await Store.findOne({ userId: user._id });
    if (!store) {
      return NextResponse.json(
        { error: "Store not found. Please create your store first." },
        { status: 404 }
      );
    }

    // Get ALL products for this store (active and inactive)
    const products = await Product.find({ storeId: store._id })
      .populate({
        path: 'storeId',
        select: 'name slug whatsapp'
      })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      products: products.map(product => ({
        ...product,
        store: product.storeId
      }))
    });
  } catch (error) {
    console.error("Error fetching store products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}