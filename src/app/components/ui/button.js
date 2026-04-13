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
            className={`py-2 px-4 ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    )
}