import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import ButtonAccount from "@/components/ButtonAccount";

export const dynamic = "force-dynamic";

export default async function DashboardTienda() {
  const session = await getServerSession(authOptions);

  // Verify user has tienda role
  if (session?.user?.role !== 'tienda') {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard Tienda</h1>
            <p className="text-gray-600">Panel de administración de tu tienda</p>
          </div>
          <ButtonAccount />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Productos</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-500">Total productos</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Ventas</h3>
            <p className="text-3xl font-bold text-green-600">$0</p>
            <p className="text-sm text-gray-500">Ventas del mes</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold mb-2">Pedidos</h3>
            <p className="text-3xl font-bold text-orange-600">0</p>
            <p className="text-sm text-gray-500">Pedidos pendientes</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Gestión de Productos</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Agregar Producto
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">Configuración de Tienda</h3>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Configurar Tienda
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}