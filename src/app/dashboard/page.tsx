'use client';

import React, {useState, useEffect} from 'react';
import DashboardStats from './DashboardStats';
// import DashboardMap from './DashboardMap';
import SideMenu from '../sidemenu';
import { getDashboard } from '@/api/Api';

interface Dashboard {
    hours: number;
    placement: number;
    rv: number;
    bs: number;
    video_showing: number;
}
const DashboardPage: React.FC = () => {

    const [dashboard, setDashboard] = useState<Dashboard>();
    const [student, setStudent] = useState<any>();

    useEffect(() => {
        async function fetchStudents() {
            let result = await getDashboard();
            console.log(result);
            setDashboard(result.report);
            setStudent(result.student);
            console.log('state has been set');
        }

        fetchStudents();
    }, [])

  return (
    <SideMenu active='dashboard'>
    <div style={{backgroundColor: "transparent"}}>
      {/* <h1>Dashboard</h1> */}
      <DashboardStats dashboard={dashboard} students={student}/>
      {/* <DashboardMap /> */}
    </div>
    </SideMenu>
  );
};

export default DashboardPage;