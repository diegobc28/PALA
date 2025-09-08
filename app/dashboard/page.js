import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import ButtonAccount from "@/components/ButtonAccount";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  // Redirect based on user role
  if (session?.user?.role === 'tienda') {
    redirect('/dashboard/tienda');
  }
  
  if (session?.user?.role === 'admin') {
    redirect('/dashboard/admin');
  }

  // Default dashboard for 'user' role
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard Usuario</h1>
        <p className="text-gray-600">Panel de usuario básico</p>
      </section>
    </main>
  );
}
