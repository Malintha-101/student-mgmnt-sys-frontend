import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/courses";

// Get all courses
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching courses:",
      (error as any).response
        ? (error as any).response.data
        : (error as any).message
    );
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
  } catch (error) {
    console.error("Error fetching Courses:", error);
    throw error;
  }
};

// Add a course
export const addCourse = async (course: any) => {
  try {
    const response = await axios.post(`${API_URL}/create`, course);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

// Update a course
export const updateCourse = async (id: number, course: any) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, course);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Get a course
export const getCourse = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};
