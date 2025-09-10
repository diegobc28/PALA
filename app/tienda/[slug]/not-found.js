import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Tienda no encontrada
          </h2>
          <p className="text-gray-600">
            La tienda que buscas no existe o no está disponible en este momento.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Volver al inicio
          </Link>
          
          <div>
            <p className="text-sm text-gray-500">
              ¿Eres dueño de una tienda?{" "}
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Crea tu perfil aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}