"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import config from "@/config";
import { CldImage } from "next-cloudinary";

export default function TiendaPage({ params }) {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch store data client-side
  useEffect(() => {
    async function fetchStore() {
      try {
        const response = await fetch(`/api/stores/${params.slug}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          setStore(null);
          return;
        }

        const data = await response.json();
        setStore(data.store);
      } catch (error) {
        console.error("Error fetching store:", error);
        setStore(null);
      } finally {
        setLoading(false);
      }
    }

    fetchStore();
  }, [params.slug]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Cargando tienda...</p>
        </div>
      </main>
    );
  }

  // Store not found
  if (!store) {
    notFound();
  }

  // Format WhatsApp URL
  const whatsappUrl = `https://wa.me/${
    store.whatsapp
  }?text=${encodeURIComponent(
    `Hola! Vengo desde tu tienda online: ${store.name}`
  )}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header/Hero Section */}
      <section className="bg-white shadow-sm">
        {/* Hero with Business Information */}
        {store.heroImageUrl ? (
          <div className="relative">
            {/* Hero Image Background */}
            <div className="w-full h-[500px] md:h-[600px] relative overflow-hidden">
              <CldImage
                width="1200"
                height="600"
                src={store.heroImageUrl}
                alt={`${store.name} - Imagen principal`}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            </div>

            {/* Business Information Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-4 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Left side - Company Name and Description */}
                  <div className="lg:col-span-2 text-white">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      {store.name}
                    </h1>
                    {store.description && (
                      <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                        {store.description}
                      </p>
                    )}
                  </div>

                  {/* Right side - Business Information Card */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Business Information
                    </h2>

                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Name :
                        </h3>
                        <p className="text-gray-900 font-medium">
                          {store.name}
                        </p>
                      </div>

                      {/* Business Type */}
                      {store.businessType && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-600 mb-1">
                            Business Type :
                          </h3>
                          <p className="text-gray-900 font-medium">
                            {store.businessType}
                          </p>
                        </div>
                      )}

                      {/* Member Since */}
                      {store.yearEstablished && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-600 mb-1">
                            Member Since :
                          </h3>
                          <p className="text-gray-900 font-medium">
                            {store.yearEstablished}
                          </p>
                        </div>
                      )}

                      {/* Location */}
                      {store.city && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-600 mb-1">
                            Location :
                          </h3>
                          <p className="text-gray-900 font-medium">
                            {store.city}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* WhatsApp Contact Button in Card */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                        </svg>
                        Chat with Supplier
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Fallback when no hero image
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Left side - Company Info */}
                <div className="lg:col-span-2">
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    {store.name}
                  </h1>
                  {store.description && (
                    <p className="text-lg md:text-xl mb-4 opacity-90">
                      {store.description}
                    </p>
                  )}
                </div>

                {/* Right side - Business Information Card */}
                <div className="bg-white rounded-xl p-6 shadow-2xl text-gray-900">
                  <h2 className="text-xl font-bold mb-6">
                    Business Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-1">
                        Name :
                      </h3>
                      <p className="font-medium">{store.name}</p>
                    </div>

                    {store.businessType && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Business Type :
                        </h3>
                        <p className="font-medium">{store.businessType}</p>
                      </div>
                    )}

                    {store.yearEstablished && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Member Since :
                        </h3>
                        <p className="font-medium">{store.yearEstablished}</p>
                      </div>
                    )}

                    {store.city && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-1">
                          Location :
                        </h3>
                        <p className="font-medium">{store.city}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                      Chat with Supplier
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* About Us Section */}
        {store.aboutUs && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Acerca de Nosotros
            </h2>
            <div
              className={`${
                store.aboutUsImageUrl
                  ? "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                  : ""
              }`}
            >
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {store.aboutUs}
                </p>
              </div>
              {store.aboutUsImageUrl && (
                <div className="order-first lg:order-last">
                  <CldImage
                    width="600"
                    height="400"
                    src={store.aboutUsImageUrl}
                    alt={`${store.name} - Acerca de nosotros`}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Information Section */}
        {(store.businessType || store.yearEstablished || store.city) && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Información Adicional
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {store.businessType && (
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">
                    Tipo de Negocio
                  </h3>
                  <p className="text-gray-900">{store.businessType}</p>
                </div>
              )}
              {store.yearEstablished && (
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">
                    Año Establecido
                  </h3>
                  <p className="text-gray-900">{store.yearEstablished}</p>
                </div>
              )}
              {store.city && (
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">Ciudad</h3>
                  <p className="text-gray-900">{store.city}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Capacity Section */}
        {(store.staffNumber || store.certifications) && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Capacidad
            </h2>
            <div className="space-y-6">
              {store.staffNumber && (
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">
                    Número de Empleados
                  </h3>
                  <p className="text-gray-900">{store.staffNumber}</p>
                </div>
              )}
              {store.certifications && (
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">
                    Certificaciones
                  </h3>
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {store.certifications}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
