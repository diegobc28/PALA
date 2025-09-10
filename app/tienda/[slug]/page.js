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
        {/* Hero Image */}
        {store.heroImageUrl && (
          <div className="w-full h-64 md:h-80 lg:h-96 relative overflow-hidden">
            <CldImage
              width="1200"
              height="600"
              src={store.heroImageUrl}
              alt={`${store.name} - Imagen principal`}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {store.name}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
                  {store.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback Header (when no hero image) */}
        {!store.heroImageUrl && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {store.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {store.description}
              </p>
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

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              ¡Contáctanos!
            </h2>

            <p className="text-gray-600">
              Estamos aquí para ayudarte. Escríbenos por WhatsApp y te
              responderemos lo antes posible.
            </p>

            <div className="flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-medium px-8 py-4 rounded-lg transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>

            <p className="text-sm text-gray-500">Número: +{store.whatsapp}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              Tienda creada con{" "}
              <a
                href={config.domainName ? `https://${config.domainName}` : "#"}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {config.appName}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
