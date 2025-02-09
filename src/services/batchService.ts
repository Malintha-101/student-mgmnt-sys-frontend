import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/batches";

// add new batch
export const addBatch = async (batch: any) => {
  try {
    const response = await axios.post(`${API_URL}/create`, batch);
    return response.data;
  } catch (error) {
    console.error("Error adding batch:", error);
    throw error;
  }
};

// get all batches
export const getBatches = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batches:", error);
    throw error;
  }
};

// get batch by id
export const getBatchById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch by id:", error);
    throw error;
  }
};

// update batch
export const updateBatch = async (id: number, batch: any) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, batch);
    return response.data;
  } catch (error) {
    console.error("Error updating batch:", error);
    throw error;
  }
};

// delete batch
export const deleteBatch = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting batch:", error);
    throw error;
  }
};

export interface UpdateBatchDTO {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  courseId: number;
}
