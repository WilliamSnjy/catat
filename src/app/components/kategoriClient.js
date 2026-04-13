"use client"

import Button from "./ui/button"
import Table from "./table"
import FormKategori from "./formKategori"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function KategoriClient({ listKategori }){
    const [showModal, setShowModal] = useState(false)
    const [mode, setMode] = useState("add")
    const [selectedKategori, setSelectedKategori] = useState(null)

    const router = useRouter()

    const refreshPage = () => {
        router.refresh()
    }

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

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Apakah yakin ingin menghapus kategori ini?"
        )

        if(!confirmDelete) return

        try {
            const res = await fetch(`/api/kategori/${id}`,{
                method: "DELETE",
            })

            if(res.ok){
                alert("Berhasil menghapus kategori")
                router.refresh()
            }
        }catch (error){
            console.error
            alert("gagal menghapus kategori")
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
                <div>
                    <Button 
                        onClick={() => handleEdit(item)}
                        variant="edit"
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(item.id_kategori)}
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
                    onSuccess={refreshPage}
                />
            )}
        </>
    )
}