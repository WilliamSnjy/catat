import Table from "./table"

export default function CardHarian({columns, data, keyField}){
    return (
        <div className="p-2 sm:p-3 flex flex-col rounded-sm bg-yellow-100 shadow-sm">
            <div className="font-bold text-sm sm:text-base md:text-md">
              Pengeluaran Hari ini : {" "}
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </div>
            <Table columns={columns} data={data} keyField={keyField}/>
        </div>
    )
}