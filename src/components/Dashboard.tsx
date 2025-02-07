// Dashboard

import React from "react";

const DashboardComponent = () => {
  return (
    <div className="flex flex-col w-full mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-10 rounded-md shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              Total Students
            </p>
            <p className="text-2xl font-semibold text-gray-800">1000</p>
          </div>
          <div className="bg-yellow-100 p-10 rounded-md shadow-md">
            <p className="text-lg font-semibold text-gray-800">Total Courses</p>
            <p className="text-2xl font-semibold text-gray-800">20</p>
          </div>
          <div className="bg-green-100 p-10 rounded-md shadow-md">
            <p className="text-lg font-semibold text-gray-800">
              Total Enrollments
            </p>
            <p className="text-2xl font-semibold text-gray-800">2000</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-10">
        <div className="bg-white p-10 rounded-md shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Enrollment Chart
          </p>
        </div>

        <div className="bg-white p-10 rounded-md shadow-md mt-4">
          <p className="text-lg font-semibold text-gray-800">Students Chart</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
