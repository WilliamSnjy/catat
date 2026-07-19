"use client"

import Button from "./ui/button"
import Table from "./table"
import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import FormPencatatan from "./formPencatatan"
import FloatingButton from "./button/floatingButton"
import Status from "./ui/status"
import Confirm from "./ui/confirm"

export default function PencatatanClient({ listPencatatan, listKategori, bulan, kategori, currentPage }){
    const totalPages = listPencatatan.totalPages || 1
    const router = useRouter()

    const [confirm, setConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState("add")
    const [selectedPencatatan, setSelectedPencatatan] = useState(null)
    const [status, setStatus] = useState({
        open: false,
        status: "loading",
        message: ""
    })

    const handleFilter = (newBulan, newKategori) => {
        const params = new URLSearchParams()

        if (newKategori) {
            params.set("kategori", newKategori)
        }

        if (newBulan) {
            params.set("bulan", newBulan)
        }

        params.set("page", 1)

        router.push(`/pencatatan?${params.toString()}`)
    }

    const handlePage = (page) => {
        const params = new URLSearchParams()

        if (kategori) {
            params.set("kategori", kategori)
        }

        if (bulan) {
            params.set("bulan", bulan)
        }

        params.set("page", page)

        router.push(`/pencatatan?${params.toString()}`)
    }

    const kategoriList = useMemo(() => {
        return [...new Set(listKategori.map((item) => item.kategori))]
    }, [listKategori])

    const handleTambah = () => {
        setMode("add")
        setSelectedPencatatan(null)
        setShowModal(true)
    }

    const handleEdit = (item) => {
        setMode("edit")
        setSelectedPencatatan(item)
        setShowModal(true)
    }

    const handleClickDelete = (pencatatan) => {
        setSelectedPencatatan(pencatatan)
        setConfirm(true)
    }

    const handleDelete = async (id) => {
        setConfirm(false)
        setStatus({
            open: true,
            status: "loading",
            message: "sedang menghapus data..."
        })

        try{
            const res = await fetch(`/api/pencatatan/${id}`, {
                method: "DELETE",
            })

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

    const header = [
        {
            header: "Tanggal",
            accessor: "tanggal",
        },
        {
            header: "Kategori",
            accessor: "kategori"
        },
        {
            header: "Jumlah",
            accessor: "jumlah"
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
            <div className="hidden sm:block">
                <Button
                    onClick={handleTambah}
                    variant="add"
                    className="max-w-3xs"
                >
                    Tambah Pencatatan
                </Button>
            </div>

            <div className="block sm:hidden">
                <FloatingButton onClick={handleTambah}/>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <select
                    value={kategori || ""}
                    onChange={(e) => handleFilter(bulan, e.target.value)}
                    className="
                        border p-2 rounded
                        w-full sm:w-auto
                        min-w-0
                    "
                >
                <option value="">Semua Kategori</option>
                {kategoriList.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
                </select>

                <input
                    type="month"
                    value={bulan || ""}
                    onChange={(e) => handleFilter(e.target.value, kategori)}
                    className="
                        border p-2 rounded
                        w-full sm:w-auto
                    "
                />
            </div>

            <Table 
                columns={header}
                data={listPencatatan.data}
                keyField="id_pengeluaran"
            />

            <div className="flex flex-row items-center justify-center gap-2 w-full sm:flex-wrap">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePage(currentPage - 1)}
                    className="
                        px-4 py-2 rounded-lg border
                        bg-white hover:bg-gray-100
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                        w-full sm:w-auto
                    "
                >
                    Prev
                </button>
                <div
                    className="
                        px-4 py-2 sm:
                        text-sm sm:text-base
                        text-gray-600
                        text-center
                        w-full sm:w-auto
                    "
                >
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePage(currentPage + 1)}
                    className="
                        px-4 py-2 rounded-lg border
                        bg-white hover:bg-gray-100
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition
                        w-full sm:w-auto
                    "
                >
                    Next
                </button>

            </div>

            {showModal && (
                <FormPencatatan 
                    mode={mode}
                    dataPencatatan={selectedPencatatan}
                    listKategori={listKategori}
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
                message={`Yakin ingin menghapus ${selectedPencatatan?.kategori}?`}
                confirmText="Hapus"
                cancelText="Batal"
                onConfirm={() => handleDelete(selectedPencatatan?.id_pengeluaran)}
                onCancel={() => setConfirm(false)}
            />
        </>
    )
}