import React from "react";
// import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() is zero-based
  const day = date.getDate();

  return `${year} оны ${month}-р сарын ${day}`;
}

const Card = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-md flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 gap-2">
        <div className="relative w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full">
          <img
            className="w-14 h-auto object-contain"
            src={data.companyPhoto}
            alt=""
          />
        </div>

        <div className="flex-1 text-left">
          <h2 className="text-xl font-semibold">{data.name}</h2>
          <p className="text-gray-600">
            {data.companyName}, {data.location}
          </p>
          {data.urgent && (
            <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              Urgent Hiring
            </span>
          )}
        </div>
      </div>

      {/* Description Section */}
      {data.description && (
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            Description
          </h3>
          <div
            className="text-gray-700 text-sm"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>
      )}

      {data.introductionText && (
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            Introduntion
          </h3>
          <div
            className="text-gray-700 text-sm"
            dangerouslySetInnerHTML={{ __html: data.introductionText }}
          />
        </div>
      )}

      {/* Requirement Section */}
      {data.requirementText && (
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-1">
            Requirements
          </h3>
          <div
            className="text-gray-700 text-sm"
            dangerouslySetInnerHTML={{ __html: data.requirementText }}
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
        <div className="flex flex-col text-sm text-gray-600">
          <span>{formatSalary(data.salary)}</span>
          <span className="text-xs text-gray-500">
            Posted: {formatMongolianDate(data.createdDate)}
          </span>
        </div>
        <button
          onClick={() => {
            window.open(
              `https://chat.oneplace.hr/chat/${data.companyId}/${data.id}`,
              "_blank"
            );
          }}
          className="bg-[#F48D7E] hover:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium w-full sm:w-auto"
        >
          Apply Now
        </button>
      </div>
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
        <div className="sm:w-[20%] w-full shadow-custom rounded-lg p-6 mb-8 sm:mb-0">
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
        <div className="sm:max-h-[96vh] overflow-y-scroll  w-full sm:w-[80%] space-y-4 py-2">
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
