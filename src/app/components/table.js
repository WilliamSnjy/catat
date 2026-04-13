export default function Table({columns ,data, keyField}){
    return (
        <table className="border-collapse border border-gray-400">
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
            {data.map((item,index) => (
              <tr key={item[keyField]}>
                {columns.map((col) => (
                  <td key={col.accessor} className="border border-gray-300 px-2 py-2">
                    {col.cell ? col.cell(item, index) : item[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    )
}