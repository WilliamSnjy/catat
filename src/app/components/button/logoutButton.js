import { useRouter } from "next/navigation"

export default function LogoutButton({ setStatus }) {
    const router = useRouter()

    const handleLogout = async () => {
        setStatus({
            open: true,
            status: "loading",
            message: "sedang mengeluarkan anda..."
        })

        const res = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(res.ok){
            setStatus({
                open: true,
                status: "success",
                message: "Berhasil Logout"
            })
            setTimeout(() => {
                router.push("/login")
            }, 1500)
        }
    }

    return (
        <>
            <button onClick={handleLogout}>
                Logout
            </button>
        </>
    )
}