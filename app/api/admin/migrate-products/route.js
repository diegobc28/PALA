import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import User from "@/models/User";

// POST /api/admin/migrate-products - Migrate existing products to new schema
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is admin (optional security check)
    const user = await User.findById(session.user.id);
    if (user?.role !== "admin" && user?.role !== "tienda") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    await connectMongo();

    // Find all products that need migration
    const products = await Product.find({});

    let migratedCount = 0;

    for (const product of products) {
      let needsUpdate = false;
      const updates = {};

      // If product has images array but no imageUrl, set imageUrl to first image
      if (product.images && product.images.length > 0 && !product.imageUrl) {
        updates.imageUrl = product.images[0];
        needsUpdate = true;
      }

      // If product has priceRange but no formatted price string
      if (
        product.priceRange &&
        product.priceRange.min !== undefined &&
        product.priceRange.max !== undefined &&
        !product.price
      ) {
        updates.price = `$${product.priceRange.min} - $${product.priceRange.max} USD`;
        needsUpdate = true;
      }

      // If product doesn't have minimumOrder field, set default
      if (!product.minimumOrder) {
        updates.minimumOrder = "1";
        needsUpdate = true;
      }

      if (needsUpdate) {
        await Product.findByIdAndUpdate(product._id, updates);
        migratedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${migratedCount} products`,
      totalProducts: products.length,
      migratedCount,
    });
  } catch (error) {
    console.error("Error migrating products:", error);
    return NextResponse.json(
      { error: "Error migrating products" },
      { status: 500 }
    );
  }
}
