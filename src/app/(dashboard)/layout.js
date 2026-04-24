"use client"

import Sidebar from "../components/ui/sidebar"
import Status from "../components/ui/status"
import { useState } from "react"

export default function Layout({ children }) {
  const [status, setStatus] = useState({
    open: false,
    status: "loading",
    message: "",
  })

  return (
    <div className="flex min-h-screen">
      <Sidebar setStatus={setStatus} />

      <main className="flex-1 p-5">
        {children}
      </main>

      <Status
        open={status.open}
        status={status.status}
        message={status.message}
        onClose={() =>
          setStatus((prev) => ({ ...prev, open: false }))
        }
      />
    </div>
  )
}