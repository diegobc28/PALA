"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";

export default function ProductosPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(null);

  // Fetch store info and products
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;
      
      try {
        // Get store info
        const storeResponse = await fetch('/api/stores');
        if (storeResponse.ok) {
          const storeData = await storeResponse.json();
          setStore(storeData.store);

          // Get products for this store using specific endpoint
          if (storeData.store) {
            const productsResponse = await fetch('/api/stores/my-products');
            if (productsResponse.ok) {
              const productsData = await productsResponse.json();
              setProducts(productsData.products || []);
            } else {
              console.error('Error fetching products:', productsResponse.status);
              toast.error('Error al cargar los productos');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user?.id]);

  const handleDeleteProduct = async (productId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    
    try {
      // TODO: Implement delete API endpoint
      toast.success('Producto eliminado correctamente');
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            No tienes una tienda creada
          </h2>
          <p className="text-gray-600 mb-6">
            Necesitas crear tu perfil de tienda antes de agregar productos
          </p>
          <Link
            href="/dashboard/tienda/perfil"
            className="btn btn-primary"
          >
            Crear Perfil de Tienda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Productos</h1>
          <p className="text-gray-600">Gestiona los productos de tu tienda</p>
        </div>
        <Link
          href="/dashboard/tienda/productos/nuevo"
          className="btn btn-primary"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar Producto
        </Link>
      </div>

      {/* Products Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productos Activos</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter(p => p.isActive).length}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productos Inactivos</p>
              <p className="text-2xl font-bold text-orange-600">
                {products.filter(p => !p.isActive).length}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Lista de Productos</h3>
        </div>
        
        {products.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes productos</h3>
            <p className="text-gray-500 mb-6">Agrega tu primer producto para empezar a vender</p>
            <Link
              href="/dashboard/tienda/productos/nuevo"
              className="btn btn-primary"
            >
              Crear Primer Producto
            </Link>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    {product.images && product.images.length > 0 ? (
                      <CldImage
                        width="300"
                        height="300"
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-green-600">
                        ${product.priceRange.min} - ${product.priceRange.max}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      MOQ: {product.minimumOrder}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/tienda/productos/${product._id}`}
                        className="flex-1 btn btn-sm btn-outline"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}