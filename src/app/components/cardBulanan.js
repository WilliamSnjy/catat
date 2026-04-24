import Table from "./table"

export default function CardBulanan({title, columns, data, keyField}){
    const colorMap = {
        "Bulan" : "bg-purple-100",
        "Wajib Bulan" : "bg-green-100",
        "Non Wajib Bulan" : "bg-blue-100"
    }

    const bgColor = colorMap[title] || "bg-gray-100"

    return (
        <div className={`p-2 flex flex-col rounded-sm ${bgColor} shadow-sm`}>
            <div className="font-bold text-sm sm:text-base md:text-md">
                Pengeluaran {title} : {""}
                {new Date().toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric"
                })}
            </div>
            <Table columns={columns} data={data} keyField={keyField}/>
        </div>
    )
}