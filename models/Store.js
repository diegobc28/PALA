import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

// STORE SCHEMA
const storeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          // Only allow alphanumeric characters and hyphens
          return /^[a-z0-9-]+$/.test(v);
        },
        message: "Slug can only contain lowercase letters, numbers, and hyphens"
      }
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(v) {
          // Basic phone number validation (numbers only, 10-15 digits)
          return /^\d{10,15}$/.test(v.replace(/\s/g, ''));
        },
        message: "WhatsApp number must be 10-15 digits"
      }
    },
    // Additional optional fields for MVP
    aboutUs: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    businessType: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    yearEstablished: {
      type: String,
      trim: true,
      maxlength: 4,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },
    staffNumber: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },
    certifications: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    // Image fields for Cloudinary integration
    heroImageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    aboutUsImageUrl: {
      type: String,
      trim: true,
      default: "",
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
storeSchema.index({ userId: 1 });
storeSchema.index({ slug: 1 });
storeSchema.index({ isActive: 1 });

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);

export default mongoose.models.Store || mongoose.model("Store", storeSchema);