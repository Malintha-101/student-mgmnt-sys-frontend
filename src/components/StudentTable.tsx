// Student table component:

import { useState } from "react";
import { } from "@heroicons/react/24/outline";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Date of Birth",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title:"Phone Number",
    dataIndex:"phone",
    key:"phone",
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
    {key: "1", name: "John Doe", email: "jo.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "2", name: "Tom Doe", email: "to.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "3", name: "Ann Jude", email: "ann.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "4", name: "John Doe", email: "jo.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "5", name: "Tom Doe", email: "to.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "6", name: "Ann Jude", email: "ann.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "7", name: "John Doe", email: "jo.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "8", name: "Tom Doe", email: "to.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"},
    {key: "9", name: "Ann Jude", email: "ann.@gmail.com",dob: "12/12/2000",address: "12, New York",phone: "1234567890"}
];

const StudentTable = () => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-gray-800 font-semi-bold">Students Management</p>
        <button className="p-2 bg-blue-950 text-white rounded-md text-sm">Add Student</button>
        </div>
        <div className="flex items-center justify-between my-4">
        <p className="text-gray-400">Total Students: {data.length}</p>
        
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

export default StudentTable;
