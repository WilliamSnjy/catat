import CardHarian from "../components/cardHarian";
import CardBulanan from "../components/cardBulanan";
import CardChart from "../components/cardChart";

async function getDashboard(){
    const res = await fetch(`/api/pencatatan/dashboard`, {
        cache: "no-store",
    })
    const data = await res.json()
    return data.data
}

const header1 = [
  {
    header: "Kategori",
    accessor: "kategori",
  },
  {
    header: "Jumlah",
    accessor: "jumlah",
  }
]

const header2 = [
  {
    header: "Kategori",
    accessor: "kategori",
  },
  {
    header: "Total",
    accessor: "total"
  }
]

const header3 = [
  {
    accessor: "total_bulan_ini"
  }
]

export default async function Home() {
  const listDashboard = await getDashboard()
  return (
     <div className="flex">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <CardHarian columns={header1} data={listDashboard.PH} keyField="id_pengeluaran"/>
          <div className="w-full overflow-x-auto  flex flex-col gap-2">
            <CardBulanan title="Bulan" columns={header3} data={listDashboard.PB} keyField="total_bulan_ini"/>
            <CardBulanan title="Wajib Bulan" columns={header3} data={listDashboard.PWB} keyField="total_bulan_ini"/>
            <CardBulanan title="Non Wajib Bulan" columns={header3} data={listDashboard.PNWB} keyField="total_bulan_ini"/>
          </div>
          <CardChart totalPengeluaran={listDashboard.PTB} targetBulanan={4000000}/>
          <div className="p-2 flex flex-col rounded-sm bg-orange-100">Coming Soon</div>
        </div>
        <div>
          <CardBulanan title="per Kategori" columns={header2} data={listDashboard.PPK} keyField="kategori"/>
        </div>
      </div>
    </div>
  );
}
