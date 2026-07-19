"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../button/logoutButton";
import { FiEdit, FiHome, FiBookOpen, FiBookmark } from "react-icons/fi";

export default function BottomNav({ setStatus }) {
  const pathname = usePathname();

  const menus = [
    {
      href: "/",
      label: "Dashboard",
      icon: FiHome,
    },
    {
      href: "/riwayat",
      label: "Riwayat",
      icon: FiBookOpen,
    },
    {
      href: "/kategori",
      label: "Kategori",
      icon: FiBookmark,
    },
    {
      href: "/pencatatan",
      label: "Catat",
      icon: FiEdit,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg z-5">
      <ul className="mx-auto flex h-16 max-w-md items-center justify-around">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <li key={menu.href}>
              <Link
                href={menu.href}
                className="flex flex-col items-center"
              >
                <Icon
                  className={`text-xl ${
                    pathname === menu.href
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                />
          
                <span
                  className={`hidden sm:block text-xs ${
                    pathname === menu.href
                      ? "font-semibold text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {menu.label}
                </span>
              </Link>
            </li>
          )})}

        <li>
          <LogoutButton setStatus={setStatus}/>
        </li>
      </ul>
    </nav>
  );
}