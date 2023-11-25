'use client';

import React, {useState, useEffect} from 'react'
import SideMenu from '../sidemenu';
import { Card, Avatar, List, Pagination, Input, Breadcrumb, Button, Space, Table,Tag  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getStudents } from '@/api/Api';
import { Congregation } from '../login/page';
import Link from 'next/link';
import { HomeOutlined, ApartmentOutlined, AimOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

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
        title: 'View Details',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <Link href={`/contacts/${id}`}> 
                        <Button type="primary">View</Button>
                        </Link>
      },
      {
        title: 'View on Map',
        dataIndex: 'geo_cord',
        key: 'geo_cord',
        render: (geo_cord: string) => <Link href={`https://www.google.com/maps?q=${geo_cord}`}>
                        <Button type="primary" icon={<AimOutlined />} > View on Map</Button>
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

  const csvColumns = [
    { title: 'Contact Name', dataIndex: 'name', key: 'name' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Phone Number', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Publisher Name', dataIndex: 'publisher_name', key: 'publisher_name' },
    { title: 'Language', dataIndex: 'language', key: 'language' },
    { title: 'Congregation', dataIndex: 'congregation', key: 'congregation' },
    { title: 'Last Discussion', dataIndex: 'last_discussion', key: 'last_discussion' },
    { title: 'Next Discussion', dataIndex: 'next_discussion', key: 'next_discussion' },
    { title: 'Publication', dataIndex: 'publication', key: 'publication' },
  ];

export default function Page() {

    const [students, setStudents] = useState<DataType[]>();
    const [exportedData, setExportedData] = useState<any[]>([]);

    useEffect(() => {
        async function fetch() {
            let result = await getStudents();
            console.log(result);
            setStudents(result.data);
            setExportedData(parseToCSV(result.data));
        }

        fetch();
    }, [])

    const parseToCSV = (contacts: any[]) => {
      let formattedData = contacts.map((contact, index) => {
        return {
          key: index,
          name: contact.name,
          address: contact.address,
          publisher_name: contact.added_by?.name,
          congregation: contact.added_by?.congregation?.name,
          last_discussion: contact.last_discussion,
          next_discussion: contact.next_discussion,
          land_mark: contact.land_mark,
          phone_number: contact.phone_number,
          language: contact.preferred_language,
          publication: contact.publication_offered,
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
        <SideMenu active='contacts'>
                  
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> <Link href="/dashboard"> <HomeOutlined /> Dashboard </Link></Breadcrumb.Item>
        <Breadcrumb.Item> <ApartmentOutlined /> Contacts</Breadcrumb.Item>
      </Breadcrumb>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 color='darkslategray'>Contacts</h3>
  
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button type="primary" style={{ marginRight: '8px' }} onClick={handleExportCSV}>
      Export to Spreadsheet
    </Button>
  </div>
</div>

            <Table columns={columns} dataSource={students} />
        </SideMenu>
    )
}