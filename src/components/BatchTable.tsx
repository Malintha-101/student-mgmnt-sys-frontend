import { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import AddBatch from "./AddBatch";
import EditBatch from "./EditBatch";
import { getBatches, deleteBatch } from "../services/batchService";

interface Batch {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  courseId: number;
  courseName: string;
}

const BatchTable = () => {
  const [search, setSearch] = useState("");
  const onSearch = (value: string) => setSearch(value);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [data, setData] = useState<Batch[]>([]);

  const fetchData = async () => {
    try {
      const batches = await getBatches();
      setData(batches);
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

  const showEditModal = (batch: Batch) => {
    setSelectedBatch(batch);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedBatch(null);
  };

  const deleteBatchHandler = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      try {
        await deleteBatch(id);
        setData(data.filter((batch) => batch.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = [
    {
      title: "Batch Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Action",
      key: "action",
      render: (record: Batch) => (
        <div className="flex items-center space-x-2">
          <button
            className="p-2 bg-blue-950 hover:bg-blue-900 text-white rounded-md cursor-pointer"
            onClick={() => showEditModal(record)}
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500 hover:bg-red-400 text-white rounded-md cursor-pointer"
            onClick={() => deleteBatchHandler(record.id)}
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
          Batch Management
        </p>
        <button
          className="p-2 bg-blue-950 hover:bg-blue-900 text-white rounded-md text-sm cursor-pointer"
          onClick={showModal}
        >
          Add New Batch
        </button>
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
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 7 }} />
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
    </div>
  );
};

export default BatchTable;
