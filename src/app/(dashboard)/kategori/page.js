import KategoriClient from "../../components/kategoriClient";

async function getKategori(){
  const res = await fetch(`${process.env.APP_URL}/api/kategori`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

export default async function Kategori() {
  const listKategori = await getKategori();
  return (
    <div className="flex flex-col gap-6">
      <KategoriClient listKategori={listKategori}/>
    </div>     
  );
}