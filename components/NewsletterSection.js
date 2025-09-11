"use client";
import { useState } from "react";

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    industry: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Newsletter signup:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            DO YOU WANT TO KNOW MORE ABOUT PALA?
          </h2>
          <p className="text-gray-300 text-lg">
            Receive information about PALA and support to join our trading
            network.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="text"
              name="industry"
              placeholder="Products or Industry"
              value={formData.industry}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
            >
              Submit
            </button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            By submitting this form, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-white">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/tos" className="underline hover:text-white">
              Terms of Service
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
