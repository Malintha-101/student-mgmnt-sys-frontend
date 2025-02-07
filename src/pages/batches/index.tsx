
import MakeSidebar from '../../components/Sidebar';
import BatchTable from '../../components/BatchTable';

const Batch = () => {
    
  return (
    <div className="flex h-screen">
        <MakeSidebar />
        <div className="flex-1 bg-gray-50 m-4">
            <BatchTable />
        </div>
    </div>
  )
  
};

export default Batch;
