"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TiendaPerfil() {
  const { data: session } = useSession();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    whatsapp: "",
    slug: "",
  });
  const [errors, setErrors] = useState({});

  // Load existing store data
  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    try {
      const response = await fetch("/api/stores");
      const data = await response.json();
      
      if (response.ok && data.store) {
        setStore(data.store);
        setFormData({
          name: data.store.name || "",
          description: data.store.description || "",
          whatsapp: data.store.whatsapp || "",
          slug: data.store.slug || "",
        });
      }
    } catch (error) {
      console.error("Error fetching store:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check slug availability
  const checkSlugAvailability = async (slug) => {
    if (!slug || slug.length < 3) {
      setSlugAvailable(null);
      return;
    }

    setCheckingSlug(true);
    try {
      const response = await fetch(`/api/stores/check-slug?slug=${encodeURIComponent(slug)}`);
      const data = await response.json();
      
      if (response.ok) {
        setSlugAvailable(data.available);
      }
    } catch (error) {
      console.error("Error checking slug:", error);
      setSlugAvailable(null);
    } finally {
      setCheckingSlug(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }

    // Check slug availability on change
    if (name === 'slug') {
      const cleanSlug = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (cleanSlug !== value) {
        setFormData(prev => ({
          ...prev,
          slug: cleanSlug
        }));
      }
      checkSlugAvailability(cleanSlug);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "El número de WhatsApp es requerido";
    } else if (!/^\d{10,15}$/.test(formData.whatsapp.replace(/\s/g, ''))) {
      newErrors.whatsapp = "El número debe tener entre 10 y 15 dígitos";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "El slug es requerido";
    } else if (formData.slug.length < 3) {
      newErrors.slug = "El slug debe tener al menos 3 caracteres";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = "Solo se permiten letras minúsculas, números y guiones";
    } else if (slugAvailable === false) {
      newErrors.slug = "Este slug ya está en uso";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const method = store ? 'PUT' : 'POST';
      const response = await fetch("/api/stores", {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStore(data.store);
        alert(store ? "Perfil actualizado exitosamente" : "Perfil creado exitosamente");
      } else {
        alert(data.error || "Error al guardar el perfil");
      }
    } catch (error) {
      console.error("Error saving store:", error);
      alert("Error al guardar el perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600">
          {store ? "Actualiza la información de tu tienda" : "Crea el perfil público de tu tienda"}
        </p>
      </div>

      {store && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Tu tienda está publicada en:</strong>{" "}
            <a 
              href={`/tienda/${store.slug}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              /tienda/{store.slug}
            </a>
          </p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre de la tienda */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Tienda *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                maxLength={100}
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                placeholder="Ej: Mi Tienda Increíble"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL de tu tienda *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">/tienda/</span>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className={`input input-bordered w-full ${errors.slug ? 'input-error' : ''}`}
                  placeholder="mi-tienda"
                />
              </div>
              {checkingSlug && (
                <p className="text-gray-500 text-sm mt-1">Verificando disponibilidad...</p>
              )}
              {!checkingSlug && slugAvailable === true && formData.slug && (
                <p className="text-green-500 text-sm mt-1">✓ Disponible</p>
              )}
              {!checkingSlug && slugAvailable === false && (
                <p className="text-red-500 text-sm mt-1">✗ No disponible</p>
              )}
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength={500}
                rows={4}
                className={`textarea textarea-bordered w-full ${errors.description ? 'textarea-error' : ''}`}
                placeholder="Describe tu tienda, productos y servicios..."
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
                <p className="text-gray-500 text-sm ml-auto">
                  {formData.description.length}/500
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                Número de WhatsApp *
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className={`input input-bordered w-full ${errors.whatsapp ? 'input-error' : ''}`}
                placeholder="5551234567"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Solo números, sin espacios ni símbolos (10-15 dígitos)
              </p>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving || checkingSlug || slugAvailable === false}
                className="btn btn-primary"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Guardando...
                  </>
                ) : (
                  store ? "Actualizar Perfil" : "Crear Perfil"
                )}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}