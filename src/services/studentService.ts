import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/students";

//get all students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// add new student
export const addStudent = async (student: any) => {
  try {
    const response = await axios.post(`${API_URL}/create`, student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete student
export const deleteStudent = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// update student
export const updateStudent = async (id: number, student: any) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get student by id
export const getStudentById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
