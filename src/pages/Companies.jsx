import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Card = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      key={data.id}
      className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden border p-4 flex flex-col gap-4 h-[280px] items-center justify-between "
    >
      <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center border overflow-hidden ">
        {data.photoUrl === null ? (
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
            src={data.photoUrl}
            alt="Company Logo"
            className="w-full h-auto object-cover"
          />
        )}
      </div>

      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{data.description}</p>
      </div>

      <div
        onClick={() => {
          navigate(`/companies/${data.id}`);
        }}
        className="flex items-center justify-center bg-[#F48D7E] rounded-xl py-2 cursor-pointer w-full"
      >
        <span className="text-sm font-medium text-[#fff]">Job Postings:</span>
        <span className="ml-2 font-semibold text-[#fff]">
          {data.assessmentCount}
        </span>
      </div>
    </div>
  );
};

const Companies = () => {
  const [list, setList] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/assessment/companies`
      )
      .then((data) => {
        setList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (list === null) {
    return (
      <div className="fixed inset-0 z-50 bg-white bg flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className=" w-10/12 m-auto py-11 ">
      <div className="flex items-center flex-wrap gap-6">
        {list.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Companies;
