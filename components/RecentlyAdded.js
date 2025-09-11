import Image from "next/image";

const RecentlyAdded = () => {
  const products = [
    {
      id: 1,
      title: "Zinc Die Casting Mold",
      company: "Die Casting Registrants Y Automotive",
      price: "$5000 - $25000 USD",
      image:
        "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "Stretch Film",
      company: "Multienpaques Del Norte",
      price: "$2.5 - $20 USD",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Lathe Machining Service Per Hour",
      company: "Materimarq De México SA De CV",
      price: "$40 - $50 USD",
      image:
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "Degreaser",
      company: "Esarb Klean",
      price: "$1.5 - $2 USD",
      image:
        "https://images.unsplash.com/photo-1609205807490-b2f461c5b3e8?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Recently Added Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <button className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-semibold hover:bg-gray-100">
                  View Details
                </button>
                <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-semibold hover:bg-purple-700">
                  Contact
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-gray-800 line-clamp-2 min-h-[48px] group-hover:text-purple-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                By {product.company}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-green-600">
                  {product.price}
                </span>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default RecentlyAdded;
