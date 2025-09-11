import Image from "next/image";
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const VendorCTA = () => {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Verified Vendors",
      description: "All vendors are verified and trusted B2B suppliers",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Direct Communication",
      description: "Chat directly with vendors for instant quotes",
    },
    {
      icon: UserGroupIcon,
      title: "Build Relationships",
      description: "Create lasting partnerships with reliable suppliers",
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Connect with Trusted B2B Vendors
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Join thousands of businesses already sourcing products from verified
            suppliers. Get competitive prices and build lasting partnerships.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center hover:bg-white/20 transition-all"
            >
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Browse All Vendors
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
              Register as a Vendor
            </button>
          </div>
          <p className="text-sm text-gray-300">
            Join our network of 10,000+ verified suppliers and buyers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold">10,000+</div>
            <div className="text-gray-300">Active Vendors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">50,000+</div>
            <div className="text-gray-300">Products Listed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">25,000+</div>
            <div className="text-gray-300">Happy Buyers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorCTA;
