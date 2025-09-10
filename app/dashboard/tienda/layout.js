import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import TiendaDashboard from "@/components/TiendaDashboard";
import config from "@/config";

export default async function LayoutTienda({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  if (session?.user?.role !== 'tienda') {
    redirect('/dashboard');
  }

  return (
    <TiendaDashboard>
      {children}
    </TiendaDashboard>
  );
}