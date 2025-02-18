import CourseTable from '../../components/CoursesTable'
import MakeSidebar from '../../components/Sidebar'

function course(){
  return (
    <div className="flex min-h-screen">
        <MakeSidebar>
        <div class="flex-1 bg-gray-50 m-4">
            <CourseTable>
        </div>
    </div>
  )
}

export default course;

