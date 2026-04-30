"use client"

import Button from "./ui/button"
import Table from "./table"
import FormKategori from "./formKategori"
import Status from "./ui/status"
import Confirm from "./ui/confirm"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function KategoriClient({ listKategori }){
    const [confirm, setConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState("add")
    const [selectedKategori, setSelectedKategori] = useState(null)
    const [status, setStatus] = useState({
        open: false,
        status: "loading",
        message: ""
    })

    const router = useRouter()

    const handleTambah = () => {
        setMode("add")
        setSelectedKategori(null)
        setShowModal(true)
    }

    const handleEdit = (item) => {
        setMode("edit")
        setSelectedKategori(item)
        setShowModal(true)
    }

    const handleClickDelete = (kategori) => {
        setSelectedKategori(kategori)
        setConfirm(true)
    }

    const handleDelete = async (id) => {
        setConfirm(false)
        setStatus({
            open: true,
            status: "loading",
            message: "sedang menghapus data..."
        })

        try {
            const res = await fetch(`/api/kategori/${id}`,{
                method: "DELETE",
            })

            const data = await res.json()

            if(res.ok){
                setStatus({
                    open: true,
                    status: "success",
                    message: "Berhasil menghapus data"
                })
                setTimeout(() => {
                    setStatus((prev) => ({ ...prev, open: false }))
                    router.refresh()
                }, 1500)
            }else{
                setStatus({
                    open: true,
                    status: "error",
                    message: data.message
                })
                setTimeout(() => {
                    setStatus((prev) => ({ ...prev, open: false }))
                }, 1500)
            }
        }catch (error){
            setStatus({
                open: true,
                status: "error",
                message: "Gagal menghapus data"
            })
            setTimeout(() => {
                setStatus((prev) => ({ ...prev, open: false }))
            }, 2000)
        }
    }

    const header =[
        {
            header: "No",
            accessor: "no",
            cell: (_, index) => index + 1
        },
        {
            header: "Kategori",
            accessor: "kategori"
        },
        {
            header: "Jenis",
            accessor: "jenis",
            cell: (item) => item.jenis ? "Wajib" : "Non Wajib"
        },
        {
            header: "Aksi",
            accessor: "aksi",
            cell: (item) => (
                <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                        onClick={() => handleEdit(item)}
                        variant="edit"
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleClickDelete(item)}
                        variant="delete"
                    >
                        Delete
                    </Button>
                </div>
            )
        }
    ]
    return (
        <>
            <Button
                onClick={handleTambah}
                variant="add"
                className="max-w-3xs"
            >
                Tambah Kategori
            </Button>

            <Table
                columns={header}
                data={listKategori}
                keyField="id_kategori"
            />

            {showModal && (
                <FormKategori
                    mode={mode}
                    dataKategori={selectedKategori}
                    onClose={() => setShowModal(false)}
                />
            )}

            <Status 
                open={status.open}
                status={status.status}
                message={status.message}
            />

            <Confirm 
                open={confirm}
                title="Hapus Kategori"
                message={`Yakin ingin menghapus ${selectedKategori?.kategori}?`}
                confirmText="Hapus"
                cancelText="Batal"
                onConfirm={() => handleDelete(selectedKategori.id_kategori)}
                onCancel={() => setConfirm(false)}
            />
        </>
    )
}