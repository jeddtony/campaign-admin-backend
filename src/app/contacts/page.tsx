'use client';

import React, {useState, useEffect} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination, Input, Breadcrumb, Button, Space, Table,Tag  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getStudents } from '@/api/Api';
import { Congregation } from '../login/page';
import Link from 'next/link';
import { HomeOutlined, ApartmentOutlined } from '@ant-design/icons';

interface Publisher {
    name: string,
    email: string,
    phone_num: string,
    congregation: Congregation
}

interface DataType {
    id: string;
    name: string;
    added_by: Publisher;
    address: string;
    phone_number: string;
    tags: string[];
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (text) => <a>{text}</a>,
      },
    {
      title: 'Publisher',
      dataIndex: 'added_by',
      key: 'added_by',
      render: (addedBy: Publisher) => <span>{addedBy.name}</span>
    },
    {
      title: 'Congregation',
      dataIndex: 'added_by',
      key: 'congregation',
      render: (addedBy: Publisher) => <span>{addedBy.congregation.name}</span>
    },
    {
        title: 'Action',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <Link href={`/contacts/${id}`}> 
                        <Button type="primary">View</Button>
                        </Link>
      },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  
export default function Page() {

    const [students, setStudents] = useState<DataType[]>();
    useEffect(() => {
        async function fetch() {
            let result = await getStudents();
            console.log(result);
            setStudents(result.data);
        }

        fetch();
    }, [])

    return (
        <SideMenu active='contacts'>
                  
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> <Link href="/dashboard"> <HomeOutlined /> Dashboard </Link></Breadcrumb.Item>
        <Breadcrumb.Item> <ApartmentOutlined /> Contacts</Breadcrumb.Item>
      </Breadcrumb>
            <h3 color='darkslategray'>Contacts</h3>

            <Table columns={columns} dataSource={students} />
        </SideMenu>
    )
}