"use client";

import { usePathname } from "next/navigation";
import AppBar from "./AppBar";

export default function AppBarWrapper() {
  const pathname = usePathname();

  // sirf tab show karo jab route /login na ho
  if (pathname === "/login") return null;

  return <AppBar />;
}
