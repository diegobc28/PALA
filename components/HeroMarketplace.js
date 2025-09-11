"use client";
import { useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const HeroMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Plastic");

  const categories = [
    "Plastic",
    "Metal",
    "Plastics",
    "CNC",
    "Harley",
    "Textiles",
    "PCB",
    "MFC/MDF",
    "Steel",
    "Machining",
  ];

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                NORTH AMERICAN B2B
                <br />
                MARKETPLACE
              </h1>
              <p className="text-xl text-gray-200 mb-2">
                B2B Industrial Sourcing Platform
              </p>
              <p className="text-gray-300 leading-relaxed">
                PALA connects industrial buyers with Verified Suppliers to drive
                continuous products across North America. Find the Right
                Manufacturers, Partners and request quotes instantly. If you're
                a Manufacturer, showcase your products and capabilities to reach
                Corporate Buyers.
              </p>
            </div>

            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">
                Connect with Verified Vendors
              </h3>
              <p className="text-sm text-gray-200 mb-4">
                Browse thousands of products from trusted suppliers. Connect
                directly with vendors to get the best deals for your business
                needs.
              </p>
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search products, vendors, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all">
                  BROWSE PRODUCTS
                </button>
                <button className="flex-1 bg-white/20 backdrop-blur text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-all border border-white/30">
                  VIEW VENDORS
                </button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop"
                alt="Business professionals"
                width={600}
                height={450}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Floating dots decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="mt-12 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-gray-300 mr-2">TOP SEARCHES:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? "bg-white text-purple-900 font-semibold"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-16 fill-base-100">
          <path d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,80C672,75,768,53,864,42.7C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroMarketplace;
