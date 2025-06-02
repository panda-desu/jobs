import React from "react";
// import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const companies = [
  { name: "Rio Tinto", rating: 4.2 },
  { name: "BHP", rating: 4.0 },
  { name: "Vale", rating: 3.9 },
  { name: "Anglo American", rating: 4.1 },
  { name: "Barrick Gold", rating: 3.8 },
  { name: "Newmont", rating: 4.0 },
];

const formatSalary = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + "сая";
  } else {
    return (value / 1000).toFixed(0) + "мянга";
  }
};

function formatMongolianDate(isoString) {
  const now = new Date();
  const date = new Date(isoString);
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return `${diffSec} сек өмнө`;
  if (diffMin < 60) return `${diffMin} мин өмнө`;
  if (diffHr < 24) return `${diffHr} цагийн өмнө`;
  if (diffDay < 7) return `${diffDay} өдрийн өмнө`;
  if (diffDay < 30) return `${diffWeek} 7 хоногийн өмнө`;
  if (diffDay < 365) return `${diffMonth} сарын өмнө`;
  return `${diffYear} жилийн өмнө`;
}

const Card = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow hover:shadow-lg p-4 transition cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {console.log(data)}
      {/* Top Section */}
      <div className="flex gap-3 items-center">
        <div className="w-[15%]">
          <div className="w-10 h-10 rounded-full bg-[#fff] overflow-hidden flex items-center justify-center border">
            {data.companyPhoto !== null ? (
              <img
                src={data.companyPhoto}
                alt="Company logo"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-sm text-gray-500">LOGO</div>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg">{data.name}</h2>
          <p
            onClick={() => {
              navigate(`/companies/${data.companyId}`);
            }}
            className="text-sm text-blue-600 underline"
          >
            {data.companyName}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 text-[#555]">
        <div className="flex items-center gap-1">
          ₮<span>{formatSalary(data.salary)}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <FiCalendar className="text-[#555]" />
          <span>{formatMongolianDate(data.createdDate)}</span>
        </div>
      </div>
      {/* Dropdown Animation Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 space-y-3 text-sm text-gray-700"
          >
            {data.introductionText && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Introduction
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: data.introductionText }}
                />
              </div>
            )}
            {data.requirementText && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Requirements
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: data.requirementText }}
                />
              </div>
            )}
            {data.description && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Description
                </h3>
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  `https://chat.oneplace.hr/chat/${data.companyId}/${data.id}`,
                  "_blank"
                );
              }}
              className="bg-[#F48D7E] hover:opacity-70 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Apply Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const JobSearch = () => {
  const [list, setList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);

  const salaryRanges = [
    { label: "1.5 сая хүртэл", min: 0, max: 1500000 },
    { label: "1.5 сая - 2 сая", min: 1500000, max: 2000000 },
    { label: "2 сая - 3 сая", min: 2000000, max: 3000000 },
    { label: "3 сая - 4 сая", min: 3000000, max: 4000000 },
    { label: "4 сая - 5 сая", min: 4000000, max: 5000000 },
    { label: "5+ сая", min: 5000000, max: Infinity },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/v1/assessment/jobs/all")
      .then((data) => {
        setList(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSalaryChange = (rangeLabel) => {
    setSelectedSalaryRanges((prev) =>
      prev.includes(rangeLabel)
        ? prev.filter((r) => r !== rangeLabel)
        : [...prev, rangeLabel]
    );
  };

  const filteredList = list?.filter((item) => {
    // Salary filter
    const matchesSalary =
      selectedSalaryRanges.length === 0 ||
      selectedSalaryRanges.some((rangeLabel) => {
        const range = salaryRanges.find((r) => r.label === rangeLabel);
        const salary = Number(item.salary);
        return salary >= range.min && salary < range.max;
      });

    // Text search filter
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      item.job?.toLowerCase().includes(lowerSearch) ||
      item.companyName?.toLowerCase().includes(lowerSearch) ||
      item.requirementText?.toLowerCase().includes(lowerSearch) ||
      item.description?.toLowerCase().includes(lowerSearch);

    return matchesSalary && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-50 to-gray-100 py-12 flex flex-col items-center justify-center md:px-0 px-4 ">
        <p className="md:text-4xl text-3xl font-semibold  text-center">
          Find Your Next Mining Job
        </p>
        <p className="mt-4 text-lg text-gray-600 text-center max-w-xl">
          Discover thousands of mining jobs from top companies worldwide
        </p>

        {/* Search bar */}
        <div className="mt-8 w-full max-w-3xl">
          <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden p-2 border">
            {/* Title Input */}
            <div className="flex items-center p-2 flex-1  sm:border-r">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 4.5 4.5a7.5 7.5 0 0 0 12.15 12.15z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <button className="bg-[#F48D7E] text-white px-6 py-3 rounded-xl font-medium hover:opacity-50 transition sm:mt-0 mt-2">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 text-sm flex flex-wrap justify-center gap-3">
          <p className="font-medium text-gray-600">Popular Searches:</p>
          <button className="text-[#F48D7E] hover:underline">
            Mining Engineer
          </button>
          <p className="text-gray-400">•</p>
          <button className="text-[#F48D7E] hover:underline">Geologist</button>
          <p className="text-gray-400">•</p>
          <button className="text-[#F48D7E] hover:underline">
            Heavy Equipment Operator
          </button>
          <p className="text-gray-400">•</p>
          <button className="text-[#F48D7E] hover:underline">
            Safety Officer
          </button>
        </div>
      </div>
      <div className="sm:px-4 py-8 w-10/12 m-auto sm:flex sm:justify-between sm:gap-6 sm:items-start block">
        <div className="sm:w-[20%] w-full shadow-custom rounded-lg p-6 mb-8 sm:mb-0 bg-[#fff]">
          <p className="text-lg font-bold mb-4">Filters</p>
          <div className="mb-6">
            <p className="mb-2 font-semibold">Job type</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>Full-time</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>Part-time</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>Consulting</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="mb-2 font-semibold">Experience Level</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>No experience</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>1-5 year</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>5-8 year</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>8-10 year</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>10-15 year</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>15+ year</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <p className="mb-2 font-semibold">Salary range</p>
            <div className="flex flex-col space-y-2">
              {salaryRanges.map((range) => (
                <div className="flex items-center gap-2" key={range.label}>
                  <input
                    className="rounded"
                    type="checkbox"
                    checked={selectedSalaryRanges.includes(range.label)}
                    onChange={() => handleSalaryChange(range.label)}
                  />
                  <p>{range.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:max-h-[88vh] overflow-y-scroll  w-full sm:w-[80%] space-y-4 py-2">
          {filteredList?.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>

      <div className="px-4  py-12 w-10/12 mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Featured Mining Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 rounded-full p-4  w-16 h-16 flex items-center justify-center mb-3">
                <div className="w-6 h-6 bg-[#F48D7E] rounded-full text-white flex items-center justify-center font-bold">
                  A
                </div>
              </div>
              <p className="font-semibold ">{company.name}</p>
              <p className="text-gray-500 text-sm">
                {company.rating} <span className="text-gray-400">★</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
