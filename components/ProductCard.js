import { CldImage } from "next-cloudinary";

export default function ProductCard({ product }) {
  // Format WhatsApp URL with product info
  const whatsappUrl = `https://wa.me/${product.store?.whatsapp}?text=${encodeURIComponent(
    `Hola! Me interesa tu producto: ${product.name} - $${product.priceRange.min}-$${product.priceRange.max} USD. Vengo desde tu tienda online.`
  )}`;

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
        {product.images && product.images.length > 0 ? (
          <CldImage
            width="400"
            height="400"
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-gray-300" 
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
        
        {/* Image count indicator */}
        {product.images && product.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            1/{product.images.length}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Store Name */}
        <p className="text-sm text-blue-600 mb-2 font-medium">
          Por: {product.store?.name || 'Tienda'}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price Range */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-green-600">
              ${product.priceRange.min.toLocaleString()}
            </span>
            {product.priceRange.min !== product.priceRange.max && (
              <span className="text-lg font-bold text-green-600">
                - ${product.priceRange.max.toLocaleString()}
              </span>
            )}
            <div className="text-xs text-gray-500">USD</div>
          </div>
        </div>

        {/* Minimum Order */}
        <div className="text-xs text-gray-500 mb-4">
          <span className="font-medium">MOQ:</span> {product.minimumOrder}
        </div>

        {/* Contact Button */}
        {product.store?.whatsapp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            Contactar Proveedor
          </a>
        )}
      </div>
    </div>
  );
}