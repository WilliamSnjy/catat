import Link from "next/link"
import LogoutButton from "../button/logoutButton"

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Catat Yuks</h2>
      <ul className="space-y-3">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/">Beranda</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/riwayat">Riwayat (On Progress)</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/kategori">Kategori</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <Link href="/pencatatan">Pencatatan</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          <LogoutButton />
        </li>
      </ul>
    </div>
  )
}