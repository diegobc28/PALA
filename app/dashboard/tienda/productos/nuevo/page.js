"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceMin: "",
    priceMax: "",
    minimumOrder: "",
  });
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (result) => {
    if (images.length >= 3) {
      toast.error("Máximo 3 imágenes por producto");
      return;
    }
    
    setImages(prev => [...prev, result.info.secure_url]);
    toast.success("Imagen subida correctamente");
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const { name, description, priceMin, priceMax, minimumOrder } = formData;
    
    if (!name.trim()) {
      toast.error("El nombre del producto es requerido");
      return false;
    }
    
    if (!description.trim()) {
      toast.error("La descripción es requerida");
      return false;
    }
    
    if (!priceMin || !priceMax) {
      toast.error("Los precios son requeridos");
      return false;
    }
    
    if (Number(priceMin) < 0 || Number(priceMax) < 0) {
      toast.error("Los precios deben ser mayores a 0");
      return false;
    }
    
    if (Number(priceMax) < Number(priceMin)) {
      toast.error("El precio máximo debe ser mayor o igual al mínimo");
      return false;
    }
    
    if (!minimumOrder.trim()) {
      toast.error("El pedido mínimo es requerido");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          priceRange: {
            min: Number(formData.priceMin),
            max: Number(formData.priceMax)
          },
          minimumOrder: formData.minimumOrder.trim(),
          images: images
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Producto creado exitosamente");
        router.push("/dashboard/tienda/productos");
      } else {
        toast.error(data.error || "Error al crear el producto");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/tienda/productos"
          className="btn btn-ghost btn-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agregar Producto</h1>
          <p className="text-gray-600">Crea un nuevo producto para tu tienda</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Ej: Transportadora de Acero Inoxidable"
                maxLength={200}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Describe las características y beneficios de tu producto..."
                maxLength={2000}
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.description.length}/2000 caracteres
              </div>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Mínimo (USD) *
                </label>
                <input
                  type="number"
                  id="priceMin"
                  name="priceMin"
                  value={formData.priceMin}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="1000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Máximo (USD) *
                </label>
                <input
                  type="number"
                  id="priceMax"
                  name="priceMax"
                  value={formData.priceMax}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="500000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Minimum Order */}
            <div>
              <label htmlFor="minimumOrder" className="block text-sm font-medium text-gray-700 mb-2">
                Pedido Mínimo *
              </label>
              <input
                type="text"
                id="minimumOrder"
                name="minimumOrder"
                value={formData.minimumOrder}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Ej: 1 Kit, 10 pieces, 5 units"
                maxLength={100}
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes del Producto (Máximo 3)
              </label>
              
              {/* Current Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <CldImage
                        width="200"
                        height="200"
                        src={imageUrl}
                        alt={`Producto ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Widget */}
              {images.length < 3 && (
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result, { widget }) => {
                    if (result.info?.secure_url) {
                      handleImageUpload({ info: { secure_url: result.info.secure_url }});
                    }
                  }}
                  onQueuesEnd={(result, { widget }) => {
                    widget.close();
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
                    >
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Click para subir imagen</span>
                        <p className="mt-1">PNG, JPG hasta 10MB</p>
                      </div>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <Link
                href="/dashboard/tienda/productos"
                className="btn btn-outline flex-1"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary flex-1"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Crear Producto"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}