"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = pathname.startsWith("/buying") || pathname.startsWith("/selling");

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1 pb-20 md:pb-0 min-w-0">{children}</main>
    </div>
  );
}
