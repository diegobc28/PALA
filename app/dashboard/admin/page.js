import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import ButtonAccount from "@/components/ButtonAccount";

export const dynamic = "force-dynamic";

export default async function DashboardAdmin() {
  const session = await getServerSession(authOptions);

  // Verify user has admin role
  if (session?.user?.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard Admin</h1>
            <p className="text-gray-600">Panel de administración del sistema</p>
          </div>
          <ButtonAccount />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Usuarios</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">Total usuarios</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Tiendas</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-500">Tiendas activas</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Ventas Total</h3>
            <p className="text-3xl font-bold text-purple-600">$0</p>
            <p className="text-sm text-gray-500">Ventas del mes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Comisiones</h3>
            <p className="text-3xl font-bold text-orange-600">$0</p>
            <p className="text-sm text-gray-500">Comisiones del mes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Gestión de Usuarios</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Ver Usuarios
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Crear Usuario
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Gestión de Tiendas</h3>
            <div className="space-y-2">
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Ver Tiendas
              </button>
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Aprobar Tiendas
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Configuración Sistema</h3>
            <div className="space-y-2">
              <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                Configuraciones
              </button>
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Logs del Sistema
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-xl font-semibold mb-4">Actividad Reciente</h3>
          <p className="text-gray-500 text-center py-8">No hay actividad reciente</p>
        </div>
      </section>
    </main>
  );
}