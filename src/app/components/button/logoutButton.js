import { useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi";

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
            <button
                onClick={handleLogout}
                className="flex flex-col items-center text-gray-500 hover:text-red-500 transition-colors"
                >
                <span className="text-xl">
                    <FiLogOut />
                </span>

                <span className="hidden sm:block text-xs">
                    Logout
                </span>
            </button>
        </>
    )
}