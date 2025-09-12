"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
            <p className="text-gray-600 mt-2">Descubre productos de nuestros proveedores</p>
          </div>
        </div>

        {/* Loading */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="loading loading-spinner loading-lg"></div>
              <p className="mt-4 text-gray-600">Cargando productos...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
            <p className="text-gray-600 mt-2">Descubre productos de nuestros proveedores</p>
          </div>
        </div>

        {/* Error */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar productos</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
              <p className="text-gray-600 mt-2">
                Descubre productos de nuestros proveedores
                {products.length > 0 && (
                  <span className="text-blue-600 font-medium ml-2">
                    ({products.length} productos disponibles)
                  </span>
                )}
              </p>
            </div>
            
            {/* Future: Search and filters will go here */}
            {/* <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="input input-bordered w-64"
                />
                <svg className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Products Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {products.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-gray-500 mb-6">
              Los proveedores aún no han agregado productos al marketplace.
            </p>
            <p className="text-sm text-gray-400">
              ¿Eres proveedor? <a href="/api/auth/signin" className="text-blue-600 hover:underline">Inicia sesión</a> para agregar tus productos.
            </p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Future: Pagination will go here */}
      {/* {products.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="flex justify-center">
            <div className="join">
              <button className="join-item btn btn-outline">«</button>
              <button className="join-item btn btn-outline btn-active">1</button>
              <button className="join-item btn btn-outline">2</button>
              <button className="join-item btn btn-outline">3</button>
              <button className="join-item btn btn-outline">»</button>
            </div>
          </div>
        </div>
      )} */}
    </main>
  );
}