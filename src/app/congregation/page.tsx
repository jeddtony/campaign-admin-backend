'use client';

import React, { useState, useEffect } from 'react';
import SideMenu from '../sidemenu';
import { Card, Avatar, Button, Table, Breadcrumb } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getCongregations } from '@/api/Api';
import Link from 'next/link';
import { HomeOutlined, BarcodeOutlined } from '@ant-design/icons';

interface Congregation {
  id: string;
  name: string;
  publishers_count: number;
  territory: string;
  cordinators_name: string;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const columns: ColumnsType<Congregation> = [
  {
    title: 'Avatar',
    dataIndex: 'name',
    key: 'avatar',
    render: (text) => (
        <Avatar style={{ backgroundColor: getRandomColor() }}>
        {text.charAt(0).toUpperCase()}
      </Avatar>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Publishers',
    dataIndex: 'publishers_count',
    key: 'publishers_count',
  },
  {
    title: 'Territory',
    dataIndex: 'territory',
    key: 'territory',
  },
  {
    title: 'Coordinator',
    dataIndex: 'cordinators_name',
    key: 'cordinators_name',
  },
  {
    title: 'View',
    key: 'view',
    render: (text, record) => (
      <Link href={`/congregation/${record.id}`}>
        <Button type="primary">View</Button>
      </Link>
    ),
  },
];

export default function Page() {
  const [congregations, setCongregations] = useState<Congregation[]>();

  useEffect(() => {
    async function fetch() {
      let result = await getCongregations();
      console.log(result);
      setCongregations(result.data);
    }

    fetch();
  }, []);

  return (
    <SideMenu active='congregations'>
      
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> <Link href="/dashboard"> <HomeOutlined /> Dashboard </Link></Breadcrumb.Item>
        <Breadcrumb.Item> <BarcodeOutlined /> Congregations</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 color='darkslategray'>Congregations</h3>
        <Link href="/congregation/add">
          <Button type="primary">Add Congregations</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={congregations} rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')} />
    </SideMenu>
  );
}
