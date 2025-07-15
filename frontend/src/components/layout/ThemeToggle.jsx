import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-full p-2 bg-[#1e1e1e] hover:bg-[#2a2a2a] transition"
            title="Toggle Theme"
        >
            {isDark ? (
                <Sun size={18} className="text-yellow-300" />
            ) : (
                <Moon size={18} className="text-indigo-300" />
            )}
        </button>
    );
}
