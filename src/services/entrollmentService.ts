import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/entrollments";

// create a new entrollment
export const addEntrollment = async (entrollment: any) => {
  try {
    const response = await axios.post(`${API_URL}/create`, entrollment);
    return response.data;
  } catch (error) {
    console.error("Error adding entrollment:", error);
    throw error;
  }
};

// update an existing entrollment
export const updateEntrollment = async (studentId: number, entrollment: any) => {
  try {
    const response = await axios.put(`${API_URL}/update/${studentId}`, entrollment);
    return response.data;
  } catch (error) {
    console.error("Error updating entrollment:", error);
    throw error;
  }
};

// get entrollments for a student
export const getEntrollments = async (studentId: number) => {
  try {
    const response = await axios.get(`${API_URL}/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching entrollments:", error);
    throw error;
  }
};


