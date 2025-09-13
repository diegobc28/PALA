import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import Store from "@/models/Store";

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

    // Check if request is from authenticated user (dashboard) or public
    const session = await getServerSession(authOptions);
    let productQuery = { _id: id };

    // If not authenticated, only show active products (public view)
    if (!session?.user?.id) {
      productQuery.isActive = true;
    }

    const product = await Product.findOne(productQuery)
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

// PUT - Update product by ID (tienda users only)
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Check if user is a tienda
    const user = await User.findById(session.user.id);
    if (user?.role !== "tienda") {
      return NextResponse.json(
        { error: "Only store owners can update products" },
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

    // Find the product and verify ownership
    const product = await Product.findOne({
      _id: id,
      storeId: store._id,
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found or you don't have permission to edit it" },
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

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        images: images || [],
        imageUrl: images && images.length > 0 ? images[0] : product.imageUrl, // Keep existing if no new images
        priceRange: {
          min: Number(priceRange.min),
          max: Number(priceRange.max),
        },
        price: `$${priceRange.min} - $${priceRange.max} USD`,
        minimumOrder: minimumOrder.trim(),
        category: category.trim(),
        subcategory: subcategory ? subcategory.trim() : null,
      },
      { new: true, runValidators: true }
    );

    // Populate store info for response
    await updatedProduct.populate({
      path: "storeId",
      select: "name slug whatsapp",
    });

    return NextResponse.json({
      success: true,
      product: {
        ...updatedProduct.toJSON(),
        store: updatedProduct.storeId,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}
