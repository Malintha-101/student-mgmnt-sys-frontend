
import MakeSidebar from '../../components/Sidebar';
import StudentTable from '../../components/StudentTable';

const Student = () => {
    
  return (
    <div className="flex h-screen">
        <MakeSidebar />
        <div className="flex-1 bg-gray-50 m-4">
            <StudentTable />
        </div>
    </div>
  )
  
};

export default Student;

