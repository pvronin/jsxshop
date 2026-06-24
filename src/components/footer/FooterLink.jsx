import { Link } from "react-router-dom";

const FooterLink = ({ link, children }) => (
    <li>
        <Link
            to={link}
            className="text-slate-300 hover:text-white hover:underline transition-colors duration-200"
        >
            {children}
        </Link>
    </li>
);

export default FooterLink
