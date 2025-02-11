import { useState, useEffect } from "react";
import { JSX } from "react";
import { Modal, Table } from "antd";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import { getStudents, deleteStudent } from "../services/studentService";
import Entrollment from "./Entrollment";

const StudentTable = () => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [data, setData] = useState<Student[]>([]);
  const [isEntrollmentModalVisible, setIsEntrollmentModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const students = await getStudents();
      setData(students);
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

  const showEditModal = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedStudent(null);
  };

  const deleteStudentHandler = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        setData(data.filter((student) => student.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [selectedEntrollmentStudent, setSelectedEntrollmentStudent] = useState<Student | null>(null);

  const showEntrollmentModal = (student: Student) => {
    setSelectedEntrollmentStudent(student);
    setIsEntrollmentModalVisible(true);
  };

  const handleEntrollmentCancel = () => {
    setIsEntrollmentModalVisible(false);
  };

  interface Student {
    id: number;
    name: string;
    email: string;
    dob: string;
    address: string;
    phone: string;
  }

  interface Column {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record: Student) => JSX.Element;
  }

  const columns: Column[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-2 bg-green-800 text-white rounded-md cursor-pointer"
            onClick={() => showEntrollmentModal(record)}
          >
            Entrollment
          </button>
          <button
            className="p-2 bg-blue-950 text-white rounded-md cursor-pointer"
            onClick={() => showEditModal(record)}
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500 text-white rounded-md cursor-pointer"
            onClick={() => deleteStudentHandler(record.id)}
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
        <p className="text-2xl text-gray-800 font-semi-bold">Students Management</p>
        <button
          className="p-2 bg-blue-950 hover:bg-blue-900 text-white rounded-md text-sm cursor-pointer"
          onClick={showModal}
        >
          Add Student
        </button>
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
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
      <Modal title={null} visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <AddStudent onClose={handleCancel} refreshStudents={fetchData}/>
      </Modal>
      <Modal title={null} visible={isEditModalVisible} onCancel={handleEditCancel} footer={null}>
        {selectedStudent && (
          <EditStudent
            student={selectedStudent}
            onClose={handleEditCancel}
            refreshStudents={fetchData}
          />
        )}
      </Modal>
      <Modal title={null} visible={isEntrollmentModalVisible} onCancel={handleEntrollmentCancel} footer={null}>
        {selectedEntrollmentStudent && (
          <Entrollment studentId={selectedEntrollmentStudent.id} onClose={handleEntrollmentCancel} />
        )}
      </Modal>
    </div>
  );
};

export default StudentTable;
