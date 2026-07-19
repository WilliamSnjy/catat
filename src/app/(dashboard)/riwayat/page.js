import RiwayatClient from "@/app/components/riwayatClient"

async function getRiwayat(){
    const res = await fetch(`${process.env.APP_URL}/api/pencatatan/riwayat`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

export default async function Riwayat(){
    const listRiwayat = await getRiwayat()
    return (
        <div className="flex">
            <RiwayatClient listRiwayat={listRiwayat}/>
        </div>
    )
}