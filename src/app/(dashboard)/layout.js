"use client"

import BottomNav from "../components/ui/bottomNav"
import Status from "../components/ui/status"
import { useState } from "react"

export default function Layout({ children }) {
  const [status, setStatus] = useState({
    open: false,
    status: "loading",
    message: "",
  })

  return (
    <div className="flex flex-col min-h-screen">
      <BottomNav setStatus={setStatus}/>

      <main className="flex-1 p-5 pb-21">
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