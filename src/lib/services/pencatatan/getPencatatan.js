import pool from "@/lib/db";

export async function getPencatatan(bulan, kategori, limit, offset){

    const result = await pool.query(
        `SELECT * FROM vw_pencatatan WHERE LEFT(tanggal,7) = $1 AND ($2 = '' OR kategori = $2) ORDER BY tanggal DESC LIMIT $3 OFFSET $4`,
         [bulan, kategori, limit, offset])

    const countResult = await pool.query(
        `SELECT COUNT(*) as total FROM vw_pencatatan WHERE LEFT(tanggal,7) = $1 AND ($2 = '' OR kategori = $2)`,
        [bulan, kategori]
    )

    const totalData = Number(
        countResult.rows[0].total
    )

    const totalPages = Math.ceil(
        totalData / limit
    )

    return {
        data: result.rows,
        totalData,
        totalPages
    }
}