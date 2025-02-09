import { useState, useEffect } from "react";
import { JSX } from "react";
import {} from "@heroicons/react/24/outline";
import { Table, Modal } from "antd";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";
import { getCourses, deleteCourse } from "../services/courseService";

const CourseTable = () => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [data, setData] = useState<Course[]>([]);

  const fetchData = async () => {
    try {
      const courses = await getCourses();
      setData(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showEditModal = (course: Course) => {
    setSelectedCourse(course);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedCourse(null);
  };

  const deleteCourseHandler = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        setData(data.filter((course) => course.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  interface Course {
    id: number;
    name: string;
    description: string;
    duration: number;
  }

  interface Column {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record: Course) => JSX.Element;
  }

  const columns: Column[] = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration (in years)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-2 bg-blue-950  hover:bg-blue-900 text-white rounded-md cursor-pointer"
            onClick={() => showEditModal(record)}
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500  hover:bg-red-400 text-white rounded-md cursor-pointer"
            onClick={() => deleteCourseHandler(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-gray-800 font-semi-bold">
          Course Management
        </p>
        <button
          className="p-2 bg-blue-950  hover:bg-blue-900 text-white rounded-md text-sm cursor-pointer"
          onClick={showModal}
        >
          Add New Course
        </button>
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
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
      <Modal
        title={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddCourse onClose={handleCancel} refreshCourses={fetchData} />
      </Modal>
      <Modal
        title={null}
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        {selectedCourse && (
          <EditCourse
            course={selectedCourse}
            onClose={handleEditCancel}
            refreshCourses={fetchData}
          />
        )}
      </Modal>
    </div>
  );
};

export default CourseTable;
