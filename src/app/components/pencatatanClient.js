"use client"

import Button from "./ui/button"
import Table from "./table"
import { useRouter } from "next/navigation"
import { useState } from "react"
import FormPencatatan from "./formPencatatan"

export default function PencatatanClient({ listPencatatan, listKategori }){
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState("add")
    const [selectedPencatatan, setSelectedPencatatan] = useState(null)

    const router = useRouter()

    const refreshPage = () => {
        router.refresh()
    }

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

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Apakah yakin ingin menghapus transaksi ini?"
        )

        if(!confirmDelete) return

        try{
            const res = await fetch(`/api/pencatatan/${id}`, {
                method: "DELETE",
            })

            if(res.ok){
                alert("Berhasil menghapus transaksi")
                router.refresh()
            }
        }catch (error){
            console.error
            alert("gagal menghapus transaksi")
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
                <div>
                    <Button 
                        onClick={() => handleEdit(item)}
                        variant="edit"
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(item.id_pengeluaran)}
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
                    onSuccess={refreshPage}
                />
            )}
        </>
    )
}