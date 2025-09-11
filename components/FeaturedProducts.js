import Image from "next/image";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title:
        'Exhaust Muffler High Performance 1 Inlet 1 Outlet 2.5" Center Flowbomb',
      company: "Mufflex S Accessories Atlas",
      price: "$25 - $60 USD",
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
      isNew: true,
    },
    {
      id: 2,
      title: "Injection Molding Plastic Parts And Assembly",
      company: "Plascosa Villagrán",
      price: "$0.1 - $5 USD",
      image:
        "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&h=300&fit=crop",
      isNew: false,
    },
    {
      id: 3,
      title:
        "Manufacturing Of Metal Parts Under Design For The Automotive Industry",
      company: "Complejo Industrial Servicio S.A De",
      price: "$50 - $5000 USD",
      image:
        "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&h=300&fit=crop",
      isNew: false,
    },
    {
      id: 4,
      title: "Ceiling Panel",
      company: "TermoFormador",
      price: "$12 - $16 USD",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      isNew: false,
    },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              {product.isNew && (
                <span className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                  NEW
                </span>
              )}
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {/* Quick Actions Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <button className="bg-white text-gray-800 px-3 py-2 rounded-lg font-semibold transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  View Details
                </button>
                <button className="bg-purple-600 text-white px-3 py-2 rounded-lg font-semibold transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  Contact Vendor
                </button>
              </div>
            </div>

            {/* Product Info */}
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
                <button className="text-purple-600 hover:text-purple-700">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
