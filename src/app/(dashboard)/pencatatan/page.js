import PencatatanClient from "../../components/pencatatanClient"
import { redirect } from "next/navigation"

async function getKategori(){
    const res = await fetch(`${process.env.APP_URL}/api/kategori`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

async function getPencatatan(bulan,kategori,page){
    const res = await fetch(`${process.env.APP_URL}/api/pencatatan?bulan=${bulan}&kategori=${kategori}&page=${page}&limit=7 `, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

export default async function Pencatatan({searchParams}) {
    const params = await searchParams
    const listKategori = await getKategori()

    const now = new Date()
    const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
    ).padStart(2, "0")}`

    const bulan = params?.bulan || currentMonth
    const kategori = params?.kategori || ""
    const page = Number(params?.page) || 1

    const listPencatatan = await getPencatatan(bulan, kategori, page)

    if (
        page > listPencatatan.totalPages &&
        listPencatatan.totalPages > 0
    ){
        redirect(
            `/pencatatan?bulan=${bulan}&kategori=${kategori}&page=${listPencatatan.totalPages}`
        )
    }
    return (
        <div className="flex flex-col gap-2 sm:gap-6">
            <PencatatanClient 
                listKategori={listKategori} 
                listPencatatan={listPencatatan}
                bulan={bulan}
                kategori={kategori}
                currentPage={page}
            />
        </div>
    )
}