'use client';

import React, {useState, useEffect} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination, Input, Breadcrumb, Button, Space, Table,Tag  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getPublishers } from '@/api/Api';
import { Congregation } from '../login/page';
import Link from 'next/link';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import Papa from 'papaparse';


interface Publisher {
    id: string,
    key: string;
    name: string;
    congregation: Congregation;
    phone_num: string;
    email: string;
    submission_status: string;
  }

  type StatusStyles = {
    [key: string]: React.CSSProperties;
  };

  const columns: ColumnsType<Publisher> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Congregation',
      dataIndex: 'congregation',
      key: 'congregation',
      render: (text: Congregation) => <span>{text.name}</span>
    },
    {
      title: 'Phone',
      dataIndex: 'phone_num',
      key: 'phone_num',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Report status',
        dataIndex: 'submission_status',
        key: 'submission_status',
        render: (text) => {
            // Define styles or colors based on submission_status
            const statusStyles: StatusStyles = {
                'submitted': { color: 'white', backgroundColor: 'rgb(50 135 50)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '5px' },
                'not-submitted': { color: 'white', backgroundColor: 'rgb(225 37 37)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '5px' },
            };
      
            const status = text.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      
            // Apply styles based on submission_status
            const style = statusStyles[status] || {};
      
            return <span style={style}>{text}</span>;
          },
      },

      {
        title: 'View',
        key: 'view',
        render: (text, record) => (
          <Link href={`/publishers/${record.id}`}>
            <Button type="primary">View</Button>
          </Link>
        ),
      },

  ];

  const csvColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Congregation', dataIndex: 'congregation', key: 'congregation' },
    { title: 'Phone Number', dataIndex: 'phone_num', key: 'phone_num' },
  ];

export default function Page() {

    const [publisher, setPublishers] = useState<Publisher []>();
    const [exportedData, setExportedData] = useState<any[]>();

    useEffect(() => {
        async function fetch() {
            let result = await getPublishers();
            console.log(result);
            setPublishers(result.data?.data);
            setExportedData(parseToCSV(result.data?.data));
        }

        fetch();
    }, [])

    const parseToCSV = (publishers: any[]) => {
      let formattedData = publishers.map((publisher, index) => {
        return {
          key: index,
          name: publisher.name,
          congregation: publisher.congregation?.name,
          phone_num: publisher.phone_num
        }
      })
      return formattedData;
    }

    const handleExportCSV = () => {
      const csvData = Papa.unparse(exportedData, { header: true });
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
  
      link.href = URL.createObjectURL(blob);
      link.download = 'table_export.csv';
      link.style.display = 'none';
  
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
    };

    
    return (
        <SideMenu active='publishers'>
                  <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> <Link href="/dashboard"> <HomeOutlined /> Dashboard </Link></Breadcrumb.Item>
        <Breadcrumb.Item> <UserOutlined /> Publishers</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h3 style={{ color: 'darkslategray', marginRight: '8px' }}>Publishers</h3>
  
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button type="primary" style={{ marginRight: '8px' }} onClick={handleExportCSV}>
      Export to Spreadsheet
    </Button>

    <Link href="/publishers/add">
      <Button type="primary">Create Publisher</Button>
    </Link>
  </div>
</div>

            <Table columns={columns} dataSource={publisher} />
        </SideMenu>
    )
} 