import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

const formatSalary = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1) + "сая";
  } else {
    return (value / 1000).toFixed(0) + "мянга";
  }
};

const getPostedDaysAgo = (dateStr) => {
  const today = new Date();
  const posted = new Date(dateStr);
  const diff = Math.floor((today - posted) / (1000 * 60 * 60 * 24));
  return `${diff} хоногийн өмнө`;
};

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
            Posted: {getPostedDaysAgo(data.createdDate)}
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
      .get(
        `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/assessment/companies/${id}`
      )
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
        <div className="flex items-center gap-6 mb-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center border-2 overflow-hidden ">
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
          <h2 className="text-2xl font-semibold ">
            {data.company.name} нийт ажлын байр
          </h2>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
          <input
            type="text"
            placeholder="Ажлын гарчиг хайх..."
            className="border px-3 py-2 rounded w-full md:w-64"
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
