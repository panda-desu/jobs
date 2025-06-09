import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full px-4 sm:px-4 py-4 border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <img className="w-8 mt-1.5" src="/oneplaceIcon.svg" alt="icon" />

          <span className="font-semibold text-lg text-gray-900">jobz.mn</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-600 text-sm font-medium">
          <Link to="/">Ажлын байрууд</Link>
          <Link to="/companies">Компаниуд</Link>
          {/* <a href="/">Salaries</a>
          <a href="/">Reviews</a> */}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="bg-[#F48D7E] hover:opacity-50 text-white px-5 py-2 rounded-md text-xs font-medium">
            Ажил олгогчоор бүртгүүлэх
          </button>
        </div>
      </div>
    </header>
  );
}
