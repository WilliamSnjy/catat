export default function Button({
    children,
    variant = "primary",
    onClick,
    className = ""
}){
    const variants = {
        add: "bg-green-200 rounded-lg hover:bg-green-400",
        edit: "bg-yellow-200 rounded-sm hover:bg-yellow-400",
        delete: "bg-red-400 rounded-sm hover:bg-red-600"
    }

    return (
        <button
            onClick={onClick}
            className={`py-1 px-2 ${variants[variant]} ${className} sm:py-2 sm:px-4`}
        >
            {children}
        </button>
    )
}