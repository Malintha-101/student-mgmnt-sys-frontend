import { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import AddBatch from "./AddBatch";
import EditBatch from "./EditBatch";
import { getBatches } from "../services/batchService";
import { getEntrollments, updateEntrollment } from "../services/entrollmentService";
import { JSX } from "react";

interface ViewEntrollmentsProps {
  studentId: number;
  onClose: () => void;
}

const ViewEntrollments = ({ studentId, onClose }: ViewEntrollmentsProps) => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [data, setData] = useState<Batch[]>([]);
  const [selectedBatchIds, setSelectedBatchIds] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      const batches = await getBatches();
      setData(batches);
      const entrollments = await getEntrollments(studentId);
      const enrolledBatchIds = entrollments.map((entrollment: any) => entrollment.batchId);
      setSelectedBatchIds(enrolledBatchIds);
      console.log("Enrolled Batch IDs:", enrolledBatchIds);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [studentId]);

  useEffect(() => {
    console.log("Selected Batch IDs:", selectedBatchIds);
  }, [selectedBatchIds]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedBatch(null);
  };

  interface Batch {
    id: number;
    name: string;
    courseName: string;
    startDate: string;
    endDate: string;
    courseId: number;
  }

  interface Column {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: any, record: Batch) => JSX.Element;
  }

  const handleEnrollClick = (batchId: number) => {
    setSelectedBatchIds((prev) =>
      prev.includes(batchId) ? prev.filter((id) => id !== batchId) : [...prev, batchId]
    );
  };

  const handleUpdate = async () => {
    const enrolledDate = new Date().toISOString(); // Current date in ISO format

    try {
      await updateEntrollment(studentId, { batchIds: selectedBatchIds });
      alert("Entrollment updated successfully!");
      setSelectedBatchIds([]);
      console.log("Updated Batch IDs:", selectedBatchIds);
      onClose();
      // refresh the window
        window.location.reload();
    } catch (error) {
      console.error("Error updating entrollment:", error);
    }
  };

  const columns: Column[] = [
    {
      title: "Batch Name",
      dataIndex: "name",
      key: "batch_name",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "course_name",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex items-center space-x-2">
          <button
            className={`${
              selectedBatchIds.includes(record.id)
                ? "bg-green-500 text-white"
                : "bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent"
            } font-semibold py-2 px-4 rounded cursor-pointer`}
            onClick={() => handleEnrollClick(record.id)}
          >
            {selectedBatchIds.includes(record.id) ? "Enrolled" : "Enroll"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between">
        <p className="text-2xl text-gray-800 font-semi-bold">Entrollments</p>
      </div>
      <div className="flex items-center justify-between my-4">
        <p className="text-gray-400">Total Batches: {data.length}</p>
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
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title={null}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddBatch onClose={handleCancel} refreshBatches={fetchData} />
      </Modal>
      <Modal
        title={null}
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        {selectedBatch && (
          <EditBatch
            batch={selectedBatch}
            onClose={handleEditCancel}
            refreshBatches={fetchData}
          />
        )}
      </Modal>
      <button
        type="button"
        className="p-2 bg-blue-950 text-white rounded-md cursor-pointer"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
};

export default ViewEntrollments;
