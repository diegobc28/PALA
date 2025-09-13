"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import toast from "react-hot-toast";

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceMin: "",
    priceMax: "",
    minimumOrder: "",
    category: "",
    subcategory: "",
  });
  const [images, setImages] = useState([]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          const product = data.product;
          setProduct(product);

          // Populate form with existing data
          setFormData({
            name: product.name || "",
            description: product.description || "",
            priceMin: product.priceRange?.min?.toString() || "",
            priceMax: product.priceRange?.max?.toString() || "",
            minimumOrder: product.minimumOrder || "",
            category: product.category || "",
            subcategory: product.subcategory || "",
          });

          // Set existing images
          setImages(product.images || []);
        } else {
          toast.error("Producto no encontrado");
          router.push("/dashboard/tienda/productos");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto");
        router.push("/dashboard/tienda/productos");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (result) => {
    if (images.length >= 3) {
      toast.error("Máximo 3 imágenes por producto");
      return;
    }

    setImages((prev) => [...prev, result.info.secure_url]);
    toast.success("Imagen subida correctamente");
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const { name, description, priceMin, priceMax, minimumOrder, category } =
      formData;

    if (!name.trim()) {
      toast.error("El nombre del producto es requerido");
      return false;
    }

    if (!description.trim()) {
      toast.error("La descripción es requerida");
      return false;
    }

    if (!priceMin || !priceMax) {
      toast.error("El rango de precios es requerido");
      return false;
    }

    if (Number(priceMin) <= 0 || Number(priceMax) <= 0) {
      toast.error("Los precios deben ser mayores a 0");
      return false;
    }

    if (Number(priceMin) >= Number(priceMax)) {
      toast.error("El precio mínimo debe ser menor al máximo");
      return false;
    }

    if (!minimumOrder.trim()) {
      toast.error("La cantidad mínima de pedido es requerida");
      return false;
    }

    if (!category.trim()) {
      toast.error("La categoría es requerida");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          priceRange: {
            min: Number(formData.priceMin),
            max: Number(formData.priceMax),
          },
          minimumOrder: formData.minimumOrder.trim(),
          category: formData.category.trim(),
          subcategory: formData.subcategory.trim() || null,
          images: images,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Producto actualizado exitosamente");
        router.push("/dashboard/tienda/productos");
      } else {
        toast.error(data.error || "Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error al actualizar el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Editar Producto
            </h1>
            <p className="text-gray-600">Cargando producto...</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editar Producto</h1>
          <p className="text-gray-600">
            Modifica la información de tu producto
          </p>
        </div>
        <Link href="/dashboard/tienda/productos" className="btn btn-outline">
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Información Básica
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Lámina de acero galvanizado"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe las características, especificaciones y usos del producto..."
                required
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Mínimo (USD) *
                </label>
                <input
                  type="number"
                  name="priceMin"
                  value={formData.priceMin}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Máximo (USD) *
                </label>
                <input
                  type="number"
                  name="priceMax"
                  value={formData.priceMax}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Minimum Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad Mínima de Pedido *
              </label>
              <input
                type="text"
                name="minimumOrder"
                value={formData.minimumOrder}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: 100 piezas, 1 tonelada, 50 metros"
                required
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Construcción, Industrial, Decoración"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subcategoría (Opcional)
                </label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Láminas, Tubos, Perfiles"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Imágenes del Producto
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sube hasta 3 imágenes de tu producto
            </p>
          </div>
          <div className="p-6">
            {/* Current Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <CldImage
                      width="300"
                      height="200"
                      src={imageUrl}
                      alt={`Producto ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Widget */}
            {images.length < 3 && (
              <CldUploadWidget
                uploadPreset="ml_default"
                onSuccess={handleImageUpload}
                options={{
                  maxFiles: 1,
                  resourceType: "image",
                  clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                  maxFileSize: 5000000, // 5MB
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <p className="text-gray-600">
                      Haz clic para subir una imagen
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      PNG, JPG, WEBP hasta 5MB ({images.length}/3)
                    </p>
                  </button>
                )}
              </CldUploadWidget>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/tienda/productos" className="btn btn-outline">
            Cancelar
          </Link>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
