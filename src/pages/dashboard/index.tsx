import React from 'react';
import MakeSidebar from '../../components/Sidebar';
import DashboardComponent from '../../components/Dashboard';

const Dashboard = () => {
    
  return (
    <div className="flex h-screen">
        <MakeSidebar />
        <div className="flex-1 bg-gray-50 m-4">
            <h1 className="text-2xl text-gray-800 font-semi-bold">Dashboard</h1>
            <DashboardComponent />
        </div>
    </div>
  )
  
};

export default Dashboard;
