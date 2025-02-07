// Course table component:

import { useState } from "react";
import { } from "@heroicons/react/24/outline";
import { Table } from "antd";

const columns = [
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className="flex items-center space-x-2">
        <button className="p-2 bg-blue-950 text-white rounded-md">Edit</button>
        <button className="p-2 bg-red-500 text-white rounded-md">Delete</button>
      </div>
    ),
  },
];


const data = [
    { key: "1", "course_name": "Mathematics", description: "This is a course on mathematics", duration: "3 years" },
    { key: "2", "course_name": "Physics", description: "This is a course on physics", duration: "4 years" },
    { key: "3", "course_name": "Chemistry", description: "This is a course on chemistry", duration: "4 years" },
    { key: "4", "course_name": "Biology", description: "This is a course on biology", duration: "3 years" },
    { key: "5", "course_name": "History", description: "This is a course on history", duration: "3 years" },
    { key: "6", "course_name": "Geography", description: "This is a course on geography", duration: "3 years" },
    { key: "7", "course_name": "English Literature", description: "This is a course on English literature", duration: "3 years" },
    { key: "8", "course_name": "Philosophy", description: "This is a course on philosophy", duration: "3 years" },
    { key: "9", "course_name": "Economics", description: "This is a course on economics", duration: "4 years" }
];

const CourseTable = () => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-gray-800 font-semi-bold">Course Management</p>
        <button className="p-2 bg-blue-950 text-white rounded-md text-sm">Add New Course</button>
        </div>
        <div className="flex items-center justify-between my-4">
        <p className="text-gray-400">Total Courses: {data.length}</p>
        
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
          {/* <SearchIcon className="h-6 w-6 text-gray-400" /> */}
        </div>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{ pageSize: 7 }}
      />
    </div>
  );
};

export default CourseTable;
