import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";

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

const CompaniesAss = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
    axios
      .get(`http://localhost:8080/v1/assessment/companies/${id}`)
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (data === null) {
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

  const filteredJobs = data.assessments.filter((job) => {
    const matchesSearch = job.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesSalary =
      selectedSalaryRanges.length === 0 ||
      selectedSalaryRanges.some((rangeLabel) => {
        const range = salaryRanges.find((r) => r.label === rangeLabel);
        return job.salary >= range.min && job.salary < range.max;
      });

    return matchesSearch && matchesSalary;
  });

  return (
    <div className="bg-gray-100">
      <div className="py-11 m-auto w-10/12 ">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-[15%]">
            <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 overflow-hidden bg-[#fff]">
              {data.company.photoUrl === null ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M9 21V6a3 3 0 116 0v15"
                  />
                </svg>
              ) : (
                <img
                  src={data.company.photoUrl}
                  alt="Company Logo"
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
          </div>
          <h2 className="text-2xl font-semibold ">
            {data.company.name} нийт ажлын байр
          </h2>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Ажлын гарчиг хайх..."
            className="border px-3 py-2 rounded-xl w-full md:w-[800px] "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="text-sm text-gray-600 me-10">
            Нийт Ажлын байрны тоо:{" "}
            <span className="font-semibold text-black">
              {data.company.assessmentCount}
            </span>
          </div>
        </div>

        <div className=" m-auto sm:flex sm:justify-between sm:gap-6 sm:items-start block">
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
            {filteredJobs?.map((data, index) => (
              <Card key={index} data={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompaniesAss;
