import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// PRODUCT SCHEMA
const productSchema = mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    minimumOrder: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Index for better performance
productSchema.index({ storeId: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ featured: 1 });

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
