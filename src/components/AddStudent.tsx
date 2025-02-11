import React, { useState } from 'react';
import { addStudent } from '../services/studentService';

interface AddStudentProps {
  onClose: () => void;
  refreshStudents: () => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ onClose, refreshStudents }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    dob: '',
    address: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addStudent(student);
      setStudent({ name: '', email: '', dob: '', address: '', phone: '' }); // Clear the form
      onClose(); // Close the modal
      refreshStudents(); // Refresh the student list
      alert('Student added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='p-2'>
        <div className="border-b border-gray-900/10">
          <h2 className="font-semibold leading-7 text-gray-900 text-lg">Add New Student</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Enter New Student information.</p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  placeholder='student name'
                  value={student.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="given-email"
                  placeholder='Email address'
                  value={student.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="Phone Number"
                  placeholder='Phone Number'
                  value={student.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  autoComplete="dob"
                  placeholder='Date of Birth'
                  value={student.dob}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="address"
                  placeholder='Address'
                  value={student.address}
                  onChange={handleChange}
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

export default AddStudent;