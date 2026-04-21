"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

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
    aboutUs: "",
    businessType: "",
    yearEstablished: "",
    city: "",
    staffNumber: "",
    certifications: "",
    heroImageUrl: "",
    aboutUsImageUrl: "",
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
          aboutUs: data.store.aboutUs || "",
          businessType: data.store.businessType || "",
          yearEstablished: data.store.yearEstablished || "",
          city: data.store.city || "",
          staffNumber: data.store.staffNumber || "",
          certifications: data.store.certifications || "",
          heroImageUrl: data.store.heroImageUrl || "",
          aboutUsImageUrl: data.store.aboutUsImageUrl || "",
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 🏪 Sección Información Principal */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Información Principal</h3>
              <p className="text-sm text-gray-600">Datos básicos que aparecerán en la parte superior de tu tienda</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre de la tienda */}
            <div className="md:col-span-2">
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
            <div className="md:col-span-2">
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
            <div className="md:col-span-2">
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

            {/* Imagen Principal/Hero */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen Principal
              </label>
              <div className="space-y-4">
                {formData.heroImageUrl && (
                  <div className="relative">
                    <CldImage
                      width="400"
                      height="200"
                      src={formData.heroImageUrl}
                      alt="Imagen principal de la tienda"
                      className="rounded-lg border w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, heroImageUrl: "" }))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result, { widget }) => {
                    if (result.info?.secure_url) {
                      setFormData(prev => ({
                        ...prev,
                        heroImageUrl: result.info.secure_url
                      }));
                      console.log('Hero image uploaded:', result.info.secure_url);
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
                      className="btn btn-outline w-full"
                    >
                      {formData.heroImageUrl ? "Cambiar Imagen Principal" : "Subir Imagen Principal"}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Imagen que aparecerá en la parte superior de tu tienda (recomendado: 1200x600px)
              </p>
            </div>
          </div>
        </div>

        {/* 🏢 Sección Información Empresarial */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-green-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Datos de la Empresa</h3>
              <p className="text-sm text-gray-600">Información que aparecerá en el Business Information card</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Negocio
              </label>
              <input
                type="text"
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                maxLength={100}
                className="input input-bordered w-full"
                placeholder="Ej: Manufacturera, Comercial, Servicios"
              />
            </div>

            {/* Year Established */}
            <div>
              <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-2">
                Año de Fundación
              </label>
              <input
                type="text"
                id="yearEstablished"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                maxLength={4}
                className="input input-bordered w-full"
                placeholder="Ej: 1999"
              />
            </div>

            {/* City */}
            <div className="md:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                maxLength={100}
                className="input input-bordered w-full"
                placeholder="Ej: Ciudad de México, Guadalajara"
              />
            </div>
          </div>
        </div>

        {/* 📖 Sección About Us */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Acerca de Nosotros</h3>
              <p className="text-sm text-gray-600">Historia detallada y presentación de tu empresa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Us */}
            <div className="md:col-span-2">
              <label htmlFor="aboutUs" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Detallada
              </label>
              <textarea
                id="aboutUs"
                name="aboutUs"
                value={formData.aboutUs}
                onChange={handleInputChange}
                maxLength={1000}
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Historia y descripción detallada de tu empresa..."
              />
              <p className="text-gray-500 text-sm mt-1">
                {formData.aboutUs.length}/1000
              </p>
            </div>

            {/* Imagen About Us */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen About Us
              </label>
              <div className="space-y-4">
                {formData.aboutUsImageUrl && (
                  <div className="relative">
                    <CldImage
                      width="400"
                      height="300"
                      src={formData.aboutUsImageUrl}
                      alt="Imagen de la sección About Us"
                      className="rounded-lg border w-full"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, aboutUsImageUrl: "" }))}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary/sign"
                  onSuccess={(result, { widget }) => {
                    if (result.info?.secure_url) {
                      setFormData(prev => ({
                        ...prev,
                        aboutUsImageUrl: result.info.secure_url
                      }));
                      console.log('About Us image uploaded:', result.info.secure_url);
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
                      className="btn btn-outline w-full"
                    >
                      {formData.aboutUsImageUrl ? "Cambiar Imagen About Us" : "Subir Imagen About Us"}
                    </button>
                  )}
                </CldUploadWidget>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Imagen que aparecerá en la sección &quot;Acerca de Nosotros&quot; (recomendado: 800x600px)
              </p>
            </div>
          </div>
        </div>

        {/* ⚡ Sección Capacidad */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Capacidad y Certificaciones</h3>
              <p className="text-sm text-gray-600">Información técnica y certificaciones de tu empresa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Staff Number */}
            <div>
              <label htmlFor="staffNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Número de Empleados
              </label>
              <input
                type="text"
                id="staffNumber"
                name="staffNumber"
                value={formData.staffNumber}
                onChange={handleInputChange}
                maxLength={50}
                className="input input-bordered w-full"
                placeholder="Ej: 10-50, 250"
              />
            </div>

            {/* Certifications */}
            <div className="md:col-span-2">
              <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-2">
                Certificaciones
              </label>
              <textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleInputChange}
                maxLength={500}
                rows={3}
                className="textarea textarea-bordered w-full"
                placeholder="Ej: ISO 9001:2015, AWS Welders Certification"
              />
              <p className="text-gray-500 text-sm mt-1">
                {formData.certifications.length}/500
              </p>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">¿Listo para publicar?</h3>
              <p className="text-sm text-gray-600">Revisa que toda la información esté correcta antes de guardar</p>
            </div>
            <button
              type="submit"
              disabled={saving || checkingSlug || slugAvailable === false}
              className="btn btn-primary btn-lg"
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
        </div>
      </form>
    </div>
  );
}