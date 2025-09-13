"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";

export default function ProductoPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else if (response.status === 404) {
          notFound();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/${
    product.store?.whatsapp
  }?text=Hola, estoy interesado en el producto: ${encodeURIComponent(
    product.name
  )}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-purple-600">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href={`/tienda/${product.store?.slug}`}
              className="hover:text-purple-600"
            >
              {product.store?.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
              {product.imageUrl ||
              (product.images && product.images.length > 0) ? (
                <CldImage
                  width="600"
                  height="600"
                  src={product.imageUrl || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg
                    className="w-32 h-32 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-4">
                {product.price}
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Descripción
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {/* Store Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Vendido por
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <Link
                    href={`/tienda/${product.store?.slug}`}
                    className="text-xl font-semibold text-purple-600 hover:text-purple-700"
                  >
                    {product.store?.name}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    Ver más productos de esta tienda
                  </p>
                </div>
                <Link
                  href={`/tienda/${product.store?.slug}`}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                >
                  Ver Tienda
                </Link>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                Contactar por WhatsApp
              </a>

              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors">
                Solicitar Cotización
              </button>
            </div>

            {/* Product Info */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Categoría:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              {product.featured && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Estado:</span>
                  <span className="text-purple-600 font-medium">
                    Producto Destacado
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Disponible:</span>
                <span className="text-green-600 font-medium">En Stock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Más productos de {product.store?.name}
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p>Cargando productos relacionados...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
