"use client"

import Table from "./table"

export default function RiwayatClient({ listRiwayat }) {

  const dataRiwayat = listRiwayat.filter(
    item => item.bulan && item.kategori
  )

  const kategoriList = [
    ...new Set(dataRiwayat.map(item => item.kategori))
  ]

  const pivotData = {}

  dataRiwayat.forEach(item => {
    const bulan = item.bulan
    const kategori = item.kategori

    if (!pivotData[bulan]) {
      pivotData[bulan] = { id: bulan, bulan }
    }

    pivotData[bulan][kategori] = item.total
  })

  const data = Object.values(pivotData)

  const header = [
    { header: "Bulan", accessor: "bulan" },
    ...kategoriList.map(kat => ({
      header: kat,
      accessor: kat,
      cell: (item) => item[kat] || 0
    }))
  ]

  return (
    <Table columns={header} data={data} keyField="id" />
  )
}