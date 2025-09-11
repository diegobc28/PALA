import Image from "next/image";

const FeaturedCategory = () => {
  const categories = [
    {
      icon: "⚙️",
      title: "CNC MACHINING",
      link: "#",
    },
    {
      icon: "🏭",
      title: "WELDING & METAL ASSEMBLY",
      link: "#",
    },
    {
      icon: "⚡",
      title: "SHEET METAL CUTTING & PROCESSING",
      link: "#",
    },
    {
      icon: "🔧",
      title: "CUSTOM METAL PARTS",
      link: "#",
    },
    {
      icon: "🔩",
      title: "METAL BENDING & FORMING",
      link: "#",
    },
    {
      icon: "✨",
      title: "FINISHES & COATINGS",
      link: "#",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Featured Category ⭐
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Left Side - Metal Fabrication Image */}
          <div className="relative group cursor-pointer overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-indigo-900/90 z-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop"
              alt="Metal Fabrication"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-end p-8">
              <div>
                <h3 className="text-white text-4xl font-bold mb-2">
                  METAL FABRICATION
                </h3>
                <p className="text-gray-200">
                  Expert metal fabrication services for all your industrial
                  needs
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.link}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-purple-500 group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{category.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {category.title}
                    </h4>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Go to Category Button */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all">
            GO TO CATEGORY
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategory;
