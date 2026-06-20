// components/common/Logo.jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Logo({ className = "", size = "md", withText = false }) {
    const sizes = {
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-14 h-14",
        xl: "w-18 h-18",
    };

    return (
        <Link to="/" className={`flex items-center gap-2 ${className}`}>
            <img
                src={logo}
                alt="لوگو فروشگاه"
                className={`${sizes[size]} object-contain`}
            />
            {withText && (
                <span className={`font-extrabold ${size === 'xl' ? 'text-3xl' : 'text-2xl'}`}>
                    <span className="text-blue-600">فروشگاه</span>
                    <span className="text-gray-800">من</span>
                </span>
            )}
        </Link>
    );
}
