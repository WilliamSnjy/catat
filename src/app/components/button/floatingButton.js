"use client";

import { FiPlus } from "react-icons/fi";

export default function FloatingButton({
    onClick,
    icon: Icon = FiPlus,
}) {
    return (
        <button
            onClick={onClick}
            className="
                fixed
                bottom-11
                right-41
                w-12
                h-12
                rounded-full
                bg-blue-600
                text-white
                shadow-xl
                flex
                items-center
                justify-center
                hover:bg-blue-700
                hover:scale-105
                active:scale-95
                transition
                z-50
            "
        >
            <Icon size={24} />
        </button>
    );
}