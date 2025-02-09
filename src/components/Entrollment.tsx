// Batch table component:

import { useState } from "react";
import { } from "@heroicons/react/24/outline";
import { Table } from "antd";

const columns = [
  {
    title: "Batch Name",
    dataIndex: "batch_name",
    key: "batch_name",
  },
  {
    title: "Course Name",
    dataIndex: "course_name",
    key: "course_name",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div className="flex items-center space-x-2">
        <button className="p-2 bg-blue-500 text-white rounded-md btn btn-primary">Entroll</button>
      </div>
    ),
  },
];


const data = [
    {key: "1", batch_name: "Batch 1", course_name: "Mathematics", start_date: "12/12/2000", end_date: "12/12/2003"},
    {key: "2", batch_name: "Batch 2", course_name: "Physics", start_date: "12/12/2000", end_date: "12/12/2004"},
    {key: "3", batch_name: "Batch 3", course_name: "Chemistry", start_date: "12/12/2000", end_date: "12/12/2004"},
    {key: "4", batch_name: "Batch 4", course_name: "Biology", start_date: "12/12/2000", end_date: "12/12/2003"},
    {key: "5", batch_name: "Batch 5", course_name: "History", start_date: "12/12/2000", end_date: "12/12/2003"},
    {key: "6", batch_name: "Batch 6", course_name: "Geography", start_date: "12/12/2000", end_date: "12/12/2003"},
    {key: "7", batch_name: "Batch 7", course_name: "English Literature", start_date: "12/12/2000", end_date: "12/12/2003"},
    {key: "8", batch_name: "Batch 8", course_name: "Philosophy", start_date: "12/12/2000", end_date: "12/12/2003"},
    {key: "9", batch_name: "Batch 9", course_name: "Economics", start_date: "12/12/2000", end_date: "12/12/2004"}
];

const Entrollment = () => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);
  

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-gray-800 font-semi-bold">Entrollments</p>
        {/* <button className="p-2 bg-blue-950 text-white rounded-md text-sm">Add New Batch</button> */}
        </div>
        <div className="flex items-center justify-between my-2">
        <p className="text-gray-400">Total Batches: {data.length}</p>
        
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
        pagination={{ pageSize: 5 }}
      />
      <button type="submit" className="p-2 bg-blue-950 text-white rounded-md">Submit</button>
    </div>
  );
};

export default Entrollment;
