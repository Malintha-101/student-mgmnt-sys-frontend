import {
    ArrowRightIcon,
    ArrowLeftIcon,
    HomeIcon,
    EllipsisVerticalIcon,
    NewspaperIcon,
    AcademicCapIcon,
    UserGroupIcon,

  } from '@heroicons/react/24/outline';
  import { useState } from 'react';
  import SidebarItem from './SidebarItem';
  
  // This sidebar component is for both mobile and desktop
  function Sidebar({ children, expanded, setExpanded }: any) {
    return (
      <div className="relative">
        {/* 
          This div is used to create the background overlay when the sidebar is expanded
          It is only visible on mobile screens
        */}
        <div
          className={`fixed inset-0 -z-10 block bg-gray-400  ${expanded ? 'block sm:hidden' : 'hidden'}`}
        />
        <aside
          className={`box-border h-screen transition-all ${expanded ? 'w-5/6 sm:w-64' : 'w-0 sm:w-20'}`}
        >
          <nav className="flex h-full flex-col border-r bg-blue-950 shadow-sm">
            <div className="flex items-center justify-between p-4 pb-2">
              <img
                src="./src/assets/logo.png"
                className={`overflow-hidden transition-all ${
                  expanded ? 'w-15' : 'w-0'
                }`}
                alt=""
              />
              <div className={`${expanded ? '' : 'hidden sm:block'}`}>
                <button
                  onClick={() => setExpanded((curr: boolean) => !curr)}
                  className="rounded-lg p-1.5 hover:bg-blue-900"
                >
                  {expanded ? (
                    <ArrowRightIcon className="h-6 w-6 text-white" />
                  ) : (
                    <ArrowLeftIcon className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>
            </div>
            <ul className="flex-1 px-3 ">{children}</ul>
            <div className="flex border-t p-3">
              <img
                src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Malintha+Kavinda"
                alt=""
                className="h-10 w-10 rounded-md"
              />
              <div
                className={`
                flex items-center justify-between
                overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}
            `}
              >
                <div className="leading-4">
                  <h4 className="font-semibold text-gray-50">Malintha Kavinda</h4>
                  <span className="text-xs text-gray-300">malintha@gmail.com</span>
                </div>
                <EllipsisVerticalIcon className="h-6 w-6" />
              </div>
            </div>
          </nav>
        </aside>
      </div>
    );
  }
  
  export default function MakeSidebar() {
    const [expanded, setExpanded] = useState(true);
    const navBarItems = [
      // {
      //   icon: <HomeIcon />,
      //   text: 'Dashboard',
      // },
      {
        icon: <AcademicCapIcon />,
        text: 'Students',
        // active: true,
      },
      {
        icon: <NewspaperIcon />,
        text: 'Courses',
      },
      {
        icon: <UserGroupIcon />,
        text: 'Batches',
      },
    ];
  
    // Desktop Sidebar
    return (
      <Sidebar expanded={expanded} setExpanded={setExpanded}>
        {navBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={expanded} {...item} />
        ))}
      </Sidebar>
    );
  }