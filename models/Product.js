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
      maxlength: 2000,
    },
    images: {
      type: [String],
      validate: {
        validator: function(v) {
          return v.length <= 3;
        },
        message: "Maximum 3 images allowed"
      },
      default: [],
    },
    priceRange: {
      min: {
        type: Number,
        required: true,
        min: 0,
      },
      max: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: function(value) {
            return value >= this.priceRange.min;
          },
          message: "Max price must be greater than or equal to min price"
        }
      },
    },
    minimumOrder: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    isActive: {
      type: Boolean,
      default: true,
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
productSchema.index({ createdAt: -1 });

// Virtual to populate store information
productSchema.virtual('store', {
  ref: 'Store',
  localField: 'storeId',
  foreignField: '_id',
  justOne: true
});

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);

export default mongoose.models.Product || mongoose.model("Product", productSchema);