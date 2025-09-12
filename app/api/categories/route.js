import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import Store from "@/models/Store";

// GET /api/categories - Get unique categories for user's store
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
        { error: "Only store owners can access categories" },
        { status: 403 }
      );
    }

    // Get user's store
    const store = await Store.findOne({ userId: user._id });
    if (!store) {
      return NextResponse.json(
        { error: "Store not found" },
        { status: 404 }
      );
    }

    // Get unique categories and subcategories for this store
    const categoryAggregation = await Product.aggregate([
      { $match: { storeId: store._id } },
      {
        $group: {
          _id: "$category",
          subcategories: { $addToSet: "$subcategory" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          subcategories: {
            $filter: {
              input: "$subcategories",
              cond: { $ne: ["$$this", null] }
            }
          }
        }
      },
      { $sort: { category: 1 } }
    ]);

    return NextResponse.json({
      success: true,
      categories: categoryAggregation
    });

  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}