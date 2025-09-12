"use client";
import { useState } from "react";
import Image from "next/image";

const NewCompanies = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const companies = [
    {
      id: 1,
      name: "BYLACK",
      tagline: "ENRIQUE RUIZ",
      category: "Security Equipment",
      logo: "BY",
      bgColor: "bg-gray-900",
    },
    {
      id: 2,
      name: "Welding Solutions Engineering Services",
      tagline: "Welding & Soldering",
      category: "Engineering Services",
      logo: "WS",
      bgColor: "bg-blue-600",
    },
    {
      id: 3,
      name: "Empaques LP",
      tagline: "Packing Equipment",
      category: "Industrial Packaging",
      logo: "LP",
      bgColor: "bg-gray-700",
    },
    {
      id: 4,
      name: "MORCK MEX",
      tagline: "Manufactura y Refacciones CII de México",
      category: "Mechanical Components",
      logo: "MM",
      bgColor: "bg-indigo-600",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === companies.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? companies.length - 4 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          New Companies in PALA
        </h2>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                {/* Company Logo/Header */}
                <div
                  className={`${company.bgColor} h-32 flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="text-white text-4xl font-bold">
                    {company.logo}
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                </div>

                {/* Company Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.category}</p>
                  <p className="text-xs text-gray-500">{company.tagline}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 text-purple-600 hover:text-purple-700 text-sm font-semibold inline-flex items-center justify-center gap-1">
                      View Profile
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-3 py-1 rounded-lg transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewCompanies;
