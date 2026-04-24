export default function Table({columns ,data, keyField}){
    return (
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-400 text-xs sm:text-sm md:text-base">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} className="border border-gray-300 px-2 text-left">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  Belum ada transaksi
                </td>
              </tr>
            ) : (
              data.map((item,index) => (
                <tr key={item[keyField]}>
                  {columns.map((col) => (
                    <td key={col.accessor} className="border border-gray-300 px-2 py-2">
                      {col.cell ? col.cell(item, index) : item[col.accessor]}
                    </td>
                  ))}
                </tr>
            )))}
          </tbody>
        </table>
      </div>
    )
}