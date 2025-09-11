import Image from "next/image";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "What is a B2B Marketplace?",
      date: "Aug 30, 2024",
      readTime: "2 min read",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
      category: "B2B",
    },
    {
      id: 2,
      title:
        "Top 3 Mexican Metal Forming Manufacturers — Find the Best Suppliers",
      date: "Jun 26, 2025",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
      category: "Manufacturing",
    },
    {
      id: 3,
      title: "Top 5 Mexican CNC Machining Suppliers for Precision Metal Parts",
      date: "Jun 26, 2025",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600&h=400&fit=crop",
      category: "CNC",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Blog</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative h-56 mb-4 overflow-hidden rounded-xl">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More Link */}
                <button className="mt-4 text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center gap-2 group">
                  GO TO READ
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
