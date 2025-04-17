import React from "react";
import { FaStar } from "react-icons/fa";
import JobData from "../json/jobData.json";

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

const Card = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-2xl shadow-md flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 gap-2">
        <div className="bg-blue-100 rounded-full p-4  w-16 h-16 flex items-center justify-center">
          <div className="w-6 h-6 bg-[#f88f00] rounded-full text-white flex items-center justify-center font-bold">
            A
          </div>
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p className="text-gray-600">
            {data.company}, {data.location}
          </p>
        </div>
        <div className="flex justify-start items-center text-yellow-500 text-sm gap-1">
          <span>{data.rating}</span>
          <FaStar size={16} />
          <span className="text-gray-400">({data.reviews} reviews)</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-left">{data.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap justify-start gap-2">
        <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {data.jobType}
        </span>
        <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
          {data.experience}
        </span>
        <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          {formatSalary(data.minSalary)} - {formatSalary(data.maxSalary)}
        </span>
        {data.urgent && (
          <span className="px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            Urgent Hiring
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-row justify-between items-center mt-2 gap-2">
        <span className="text-gray-500 text-sm">Posted {data.posted}</span>
        <button className="bg-[#f88f00] hover:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium w-auto">
          Apply Now
        </button>
      </div>
    </div>
  );
};

const JobSearch = () => {
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
                placeholder="Job title, keywords, or company"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center p-2 flex-1">
              <svg
                className="w-5 h-5 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <button className="bg-[#f88f00] text-white px-6 py-3 rounded-xl font-medium hover:opacity-50 transition sm:mt-0 mt-2">
              Search Jobs
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-6 text-sm flex flex-wrap justify-center gap-3">
          <p className="font-medium text-gray-600">Popular Searches:</p>
          <button className="text-[#f88f00] hover:underline">
            Mining Engineer
          </button>
          <p className="text-gray-400">•</p>
          <button className="text-[#f88f00] hover:underline">Geologist</button>
          <p className="text-gray-400">•</p>
          <button className="text-[#f88f00] hover:underline">
            Heavy Equipment Operator
          </button>
          <p className="text-gray-400">•</p>
          <button className="text-[#f88f00] hover:underline">
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
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>1.5 сая хүртэл</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>1.5 сая - 2 сая</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>2 сая - 3 сая</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>3 сая - 4 сая</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>4 сая - 5 сая</p>
              </div>
              <div className="flex items-center gap-2">
                <input className="rounded" type="checkbox" />
                <p>5+ сая</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:max-h-[88vh] overflow-y-scroll  w-full sm:w-[80%] space-y-4 py-2">
          {JobData.map((data, index) => (
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
                <div className="w-6 h-6 bg-[#f88f00] rounded-full text-white flex items-center justify-center font-bold">
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
