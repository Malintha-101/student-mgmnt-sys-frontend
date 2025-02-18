

import CourseTable from '../../components/CoursesTable';
import MakeSidebar from '../../components/Sidebar';

const Course = () => {
    
  return (
    <div className="flex min-h-screen">
        <MakeSidebar />
        <div className="flex-1 bg-gray-50 m-4">
            <CourseTable />
        </div>
    </div>
  )
  
};

export default Course;
