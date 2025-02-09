import React, { useState, useEffect } from "react";
import { updateCourse } from "../services/courseService";

interface Course {
  id: number;
  name: string;
  duration: number;
  description: string;
}

interface EditCourseProps {
  course: Course;
  onClose: () => void;
  refreshCourses: () => void;
}

const EditCourse = ({ course, onClose, refreshCourses }: EditCourseProps) => {
  const [updatedCourse, setUpdatedCourse] = useState(course);

  useEffect(() => {
    setUpdatedCourse(course);
  }, [course]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedCourse({ ...updatedCourse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateCourse(updatedCourse.id, updatedCourse);
      onClose();
      refreshCourses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2">
        <div className="border-b border-gray-900/10">
          <h2 className="font-semibold leading-7 text-gray-900 text-lg">
            Edit Course
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Update course information.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={updatedCourse.name}
                  onChange={handleChange}
                  placeholder="Course name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="duration"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Duration (in years)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  value={updatedCourse.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  name="description"
                  id="description"
                  value={updatedCourse.description}
                  onChange={handleChange}
                  placeholder="Description"
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

export default EditCourse;
