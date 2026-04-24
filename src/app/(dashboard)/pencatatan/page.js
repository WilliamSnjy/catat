import Sidebar from "../../components/ui/sidebar"
import PencatatanClient from "../../components/pencatatanClient";

async function getKategori(){
    const res = await fetch(`${process.env.APP_URL}/api/kategori`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

async function getPencatatan(){
    const res = await fetch(`${process.env.APP_URL}/api/pencatatan`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

export default async function Pencatatan() {
    const listKategori = await getKategori()
    const listPencatatan = await getPencatatan()
    return (
        <div className="flex">
            <div className="flex flex-col gap-6">
                <div className="text-2xl font-bold">
                    Pencatatan
                </div>

                <PencatatanClient 
                    listKategori={listKategori} 
                    listPencatatan={listPencatatan}
                />
            </div>
        </div>
    )
}