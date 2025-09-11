"use client";
import { useState } from "react";
import Image from "next/image";

const CategoriesExplore = () => {
  const [activeTab, setActiveTab] = useState("metal");

  const categories = {
    metal: [
      {
        id: 1,
        title: "LATHE MACHINING SERVICES PER HOUR",
        company: "ACMERICA",
        priceRange: "$35 - $45 USD",
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
      },
      {
        id: 2,
        title:
          "Manufacturing Of Metal Parts Under Design For The Electric Motor Industry",
        company: "Complejo Industrial Servicio S.A De C.V",
        priceRange: "$50 - $5000 USD",
        image:
          "https://images.unsplash.com/photo-1629196613836-28c85ba09055?w=400&h=300&fit=crop",
      },
      {
        id: 3,
        title: "Carte Laser",
        company: "AITS METALWORKS",
        priceRange: "$10 - $100 USD",
        image:
          "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
      },
      {
        id: 4,
        title: "CNC Machining",
        company: "Silverberry Industrial Intelligence",
        priceRange: "$2000 - $90000 USD",
        image:
          "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=400&h=300&fit=crop",
      },
      {
        id: 5,
        title: "CNC Machining Service",
        company: "Multiservices Delgues S.A De C.V",
        priceRange: "$50 - $50000 USD",
        image:
          "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop",
      },
      {
        id: 6,
        title: "Milling Horizontal Machining Service Per Hour",
        company: "Materimarq De México SA De CV",
        priceRange: "$40 - $50 USD",
        image:
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
      },
    ],
    advertising: [],
    plastic: [],
    electrical: [],
    industrial: [],
  };

  const tabConfig = [
    { key: "metal", label: "METAL & METAL PRODUCTS", icon: "⚙️" },
    {
      key: "advertising",
      label: "ADVERTISING, PACKAGING & PRINTING",
      icon: "📦",
    },
    { key: "plastic", label: "PLASTIC & RUBBER PRODUCTS", icon: "🔧" },
    { key: "electrical", label: "ELECTRICAL & ELECTRONICS", icon: "⚡" },
    { key: "industrial", label: "INDUSTRIAL EQUIPMENT", icon: "🏭" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Explore More Categories!
          </h2>
          <p className="text-gray-600">Find the right suppliers for you.</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-t-xl">
            {tabConfig.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-purple-900"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-xl shadow-lg p-6">
            {categories[activeTab].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories[activeTab].map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        By {item.company}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-green-600 font-bold">
                          {item.priceRange}
                        </p>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
                          Contact →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No products available in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesExplore;
