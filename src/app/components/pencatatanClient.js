"use client"

import Button from "./ui/button"
import Table from "./table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import FormPencatatan from "./formPencatatan"
import Status from "./ui/status"
import Confirm from "./ui/confirm"

export default function PencatatanClient({ listPencatatan, listKategori }){
    const [confirm, setConfirm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState("add")
    const [selectedPencatatan, setSelectedPencatatan] = useState(null)
    const [status, setStatus] = useState({
        open: false,
        status: "loading",
        message: ""
    })

    const router = useRouter()

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
            <Button
                onClick={handleTambah}
                variant="add"
                className="max-w-3xs"
            >
                Tambah Pengeluaran                
            </Button>

            <Table 
                columns={header}
                data={listPencatatan}
                keyField="id_pengeluaran"
            />

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
                onConfirm={() => handleDelete(selectedPencatatan.id_pengeluaran)}
                onCancel={() => setConfirm(false)}
            />
        </>
    )
}