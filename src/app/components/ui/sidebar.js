"use client"

import { useState } from "react"
import Link from "next/link"
import LogoutButton from "../button/logoutButton"

export default function Sidebar({ setStatus }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="lg:hidden bg-gray-800 text-white p-4">
        <button onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50
          min-h-screen bg-gray-800 text-white p-5
          transform transition-transform duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <h2 className="text-2xl font-bold mb-6 hidden lg:block">
          Catat Yuks
        </h2>

        <ul className="space-y-3">
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link href="/" onClick={() => setOpen(false)}>Beranda</Link>
          </li>

          <li className="hover:bg-gray-700 p-2 rounded">
            <Link href="/riwayat" onClick={() => setOpen(false)}>
              Riwayat
            </Link>
          </li>

          <li className="hover:bg-gray-700 p-2 rounded">
            <Link href="/kategori" onClick={() => setOpen(false)}>
              Kategori
            </Link>
          </li>

          <li className="hover:bg-gray-700 p-2 rounded">
            <Link href="/pencatatan" onClick={() => setOpen(false)}>
              Pencatatan
            </Link>
          </li>

          <li className="hover:bg-gray-700 p-2 rounded">
            <LogoutButton setStatus={setStatus}/>
          </li>
        </ul>
      </div>
    </>
  )
}