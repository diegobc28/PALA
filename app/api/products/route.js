import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import Store from "@/models/Store";

// GET /api/products - Get all active products (public)
export async function GET() {
  try {
    await connectMongo();

    const products = await Product.find({ isActive: true })
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
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (tienda users only)
export async function POST(req) {
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
    if (user?.role !== "tienda") {
      return NextResponse.json(
        { error: "Only store owners can create products" },
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

    const body = await req.json();
    const {
      name,
      description,
      images,
      priceRange,
      minimumOrder,
      category,
      subcategory,
    } = body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !priceRange?.min ||
      !priceRange?.max ||
      !minimumOrder ||
      !category
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate price range
    if (
      priceRange.min < 0 ||
      priceRange.max < 0 ||
      priceRange.max < priceRange.min
    ) {
      return NextResponse.json(
        { error: "Invalid price range" },
        { status: 400 }
      );
    }

    // Validate images array
    if (images && (!Array.isArray(images) || images.length > 3)) {
      return NextResponse.json(
        { error: "Images must be an array with maximum 3 items" },
        { status: 400 }
      );
    }

    // Create product
    const product = new Product({
      storeId: store._id,
      name: name.trim(),
      description: description.trim(),
      images: images || [],
      imageUrl: images && images.length > 0 ? images[0] : "", // Use first image as main imageUrl
      priceRange: {
        min: Number(priceRange.min),
        max: Number(priceRange.max),
      },
      price: `$${priceRange.min} - $${priceRange.max} USD`, // Format price string
      minimumOrder: minimumOrder.trim(),
      category: category.trim(),
      subcategory: subcategory ? subcategory.trim() : null,
      isActive: true,
    });

    await product.save();

    // Populate store info for response
    await product.populate({
      path: "storeId",
      select: "name slug whatsapp",
    });

    return NextResponse.json(
      {
        success: true,
        product: {
          ...product.toJSON(),
          store: product.storeId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
