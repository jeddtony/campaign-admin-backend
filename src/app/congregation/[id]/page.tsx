'use client';

import React, {useState, useEffect} from 'react'
import SideMenu from '../../sidemenu';
import { Button, Table, Breadcrumb, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getPublishers } from '@/api/Api';
import { Congregation } from '../../login/page';
import { HomeOutlined, BarcodeOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';


interface Publisher {
    key: string;
    name: string;
    congregation: Congregation;
    phone_num: string;
    email: string;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const columns: ColumnsType<Publisher> = [
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

  ];
  
export default function Page({params} : any) {

    const id = params?.id;
    const [publisher, setPublishers] = useState<Publisher []>();
    const [congregation, setCongregation] = useState<string>();

    useEffect(() => {
        async function fetch() {
            let result = await getPublishers(id);
            console.log(result);
            setPublishers(result.data?.data);
            setCongregation(result.data?.data[0].congregation.name)
        }

        fetch();
    }, [])

    return (
        <SideMenu active='congregation'>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item> <Link href="/dashboard"> <HomeOutlined /> Dashboard </Link></Breadcrumb.Item>
            <Breadcrumb.Item> <BarcodeOutlined /> Congregations</Breadcrumb.Item>
            <Breadcrumb.Item> <UserOutlined /> Publishers</Breadcrumb.Item>
      </Breadcrumb>

 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 <h3 color='darkslategray'> {congregation} Publishers</h3>
    <Link href="/publishers/add">
      <Button type="primary">Create Publisher</Button>
    </Link>
  </div>
            <Table columns={columns} dataSource={publisher} />
        </SideMenu>
    )
}