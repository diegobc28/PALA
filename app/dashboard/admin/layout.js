import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import config from "@/config";

export default async function LayoutAdmin({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  if (session?.user?.role !== 'admin') {
    redirect('/dashboard');
  }

  return <>{children}</>;
}