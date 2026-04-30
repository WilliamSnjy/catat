import KategoriClient from "../../components/kategoriClient";

async function getKategori(){
  const res = await fetch(`/api/kategori`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

export default async function Kategori() {
  const listKategori = await getKategori();
  return (
     <div className="flex">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Kategori</h1>
        <KategoriClient listKategori={listKategori}/>
      </div>     
    </div>
  );
}