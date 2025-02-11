import React, { useState } from 'react';
import { addCourse } from '../services/courseService';

interface AddCourseProps {
  onClose: () => void;
  refreshCourses: () => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ onClose, refreshCourses }) => {
  const [course, setCourse] = useState({
    name: '',
    duration: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addCourse(course);
      setCourse({ name: '', duration: '', description: '' }); // Clear the form
      onClose(); // Close the modal
      refreshCourses(); // Refresh the course table
      alert('Course added successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='p-2'>
        <div className="border-b border-gray-900/10">
          <h2 className="font-semibold leading-7 text-gray-900 text-lg">Add New Course</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Enter New Course information.</p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Course name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  placeholder='Course name'
                  value={course.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                Duration (in years)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  autoComplete="duration"
                  placeholder='Duration'
                  value={course.duration}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  autoComplete="description"
                  placeholder='Description'
                  value={course.description}
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

export default AddCourse;