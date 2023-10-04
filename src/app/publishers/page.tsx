'use client';

import React, {useState, useEffect} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination, Input, Breadcrumb, Button, Space, Table,Tag  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getPublishers } from '@/api/Api';
import { Congregation } from '../login/page';
import Link from 'next/link';
import { HomeOutlined, BarcodeOutlined, UserOutlined } from '@ant-design/icons';


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
  
export default function Page() {

    const [publisher, setPublishers] = useState<Publisher []>();
    useEffect(() => {
        async function fetch() {
            let result = await getPublishers();
            console.log(result);
            setPublishers(result.data?.data);
        }

        fetch();
    }, [])

    return (
        <SideMenu active='publishers'>
                  <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> <Link href="/dashboard"> <HomeOutlined /> Dashboard </Link></Breadcrumb.Item>
        <Breadcrumb.Item> <UserOutlined /> Publishers</Breadcrumb.Item>
      </Breadcrumb>

 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 <h3 color='darkslategray'>Publishers</h3>
    <Link href="/publishers/add">
      <Button type="primary">Create Publisher</Button>
    </Link>
  </div>

            <Table columns={columns} dataSource={publisher} />
        </SideMenu>
    )
}