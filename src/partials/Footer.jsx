import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 sm:px-8 px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <p className="text-white text-lg font-semibold mb-4">MineJobs</p>
          <p>
            The leading platform for mining professionals to find their next
            career opportunity.
          </p>
        </div>

        {/* Job Seekers */}
        <div>
          <p className="text-white text-lg font-semibold mb-4">
            For Job Seekers
          </p>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Company Reviews
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Salary Calculator
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Career Advice
              </a>
            </li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <p className="text-white text-lg font-semibold mb-4">For Employers</p>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Post a Job
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Browse Candidates
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Pricing Plans
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Recruiting Solutions
              </a>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <p className="text-white text-lg font-semibold mb-4">
            Connect With Us
          </p>
          <div className="flex space-x-4 text-xl mb-4">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaLinkedinIn className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
          </div>
          <p className="mb-2">Subscribe to our newsletter</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-[#f88f00] text-white px-4 py-2 rounded-r-md">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © 2023 MineJobs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
