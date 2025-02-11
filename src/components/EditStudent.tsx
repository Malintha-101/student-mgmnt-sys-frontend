import React, { useState, useEffect } from "react";
import { updateStudent } from "../services/studentService";

interface Student {
  id: number;
  name: string;
  email: string;
  dob: string;
  address: string;
  phone: string;
}

interface EditStudentProps {
  student: Student;
  onClose: () => void;
  refreshStudents: () => void;
}

const EditStudent = ({ student, onClose, refreshStudents }: EditStudentProps) => {
  const [updatedStudent, setUpdatedStudent] = useState(student);

  useEffect(() => {
    setUpdatedStudent(student);
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedStudent({ ...updatedStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateStudent(updatedStudent.id, updatedStudent);
      onClose();
      refreshStudents();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2">
        <div className="border-b border-gray-900/10">
          <h2 className="font-semibold leading-7 text-gray-900 text-lg">
            Edit Student
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Update student information.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Student name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={updatedStudent.name}
                  onChange={handleChange}
                  placeholder="Student name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={updatedStudent.dob}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={updatedStudent.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={updatedStudent.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={updatedStudent.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditStudent;
