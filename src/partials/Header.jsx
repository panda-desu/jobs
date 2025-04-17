import { FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full px-4 sm:px-4 py-4 border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#f88f00] rounded-md flex items-center justify-center text-white font-bold text-sm">
            ▲
          </div>
          <span className="font-semibold text-lg text-gray-900">MineJobs</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-gray-600 text-sm font-medium">
          <a href="/jobs">Jobs</a>
          <a href="/">Companies</a>
          <a href="/">Salaries</a>
          <a href="/">Reviews</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button>
            <FaBell className="text-gray-600 w-5 h-5" />
          </button>
          <button className="bg-[#f88f00] hover:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium">
            Post a Job
          </button>
        </div>
      </div>
    </header>
  );
}
