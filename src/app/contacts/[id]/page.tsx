'use client';

import React, {useState, useEffect} from 'react';
import { cookies, headers } from "next/headers";
import { Form, Input, Button, Spin, message } from 'antd';
import { getOneStudent } from "@/api/Api";
import { Card, Avatar, Descriptions, Row, Col, Typography } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import SideMenu from '../../sidemenu';

const { Title, Text } = Typography;

export interface Contact {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    coordinates: string;
    avatar: string;
    land_mark: string;
    preferred_language: string;
    last_discussion: string;
    next_discussion: string;
    added_by: any;
    publication_offered: string;

  }

const MyComponent = ({ params, searchParams } : any) => {

    const [contact, setContact] = useState<Contact>();
    const id = params?.id;

    useEffect(() => {
        async function fetchStudents() {
            let result = await getOneStudent(id);
            console.log(result);
            setContact(result.data[0]);
        }

        fetchStudents();
    }, [])

    return (
        <SideMenu active='contacts'>
        <h1>Contact Details</h1>
        <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <Card>
            <Avatar size={128} src={"http://google.com"} icon={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={16} lg={18}>
          <Card>
          <div>
              <Text strong>Username:</Text> <Text>{contact?.name}</Text>
            </div>
            <div>
              <Text strong>Email:</Text> <Text>{contact?.email}</Text>
            </div>
            <div>
              <Text strong>Phone Number:</Text> <Text>{contact?.phone_number}</Text>
            </div>
            <div>
              <Text strong>Address:</Text> <Text>{contact?.address}</Text>
            </div>

          </Card>
          </Col>

          <Col xs={24} sm={24} md={8} lg={6}>
          <Card title="Additional Information">
            <div>
              <Text strong>Landmark:</Text> <Text>{contact?.land_mark}</Text>
            </div>
            <div>
              <Text strong>Language:</Text> <Text>{contact?.preferred_language}</Text>
            </div>
          </Card>

          </Col>

          <Col xs={24} sm={24} md={8} lg={6}>
          <Card title="Publisher Information">
            <div>
              <Text strong>Name:</Text> <Text>{contact?.added_by.name}</Text>
            </div>
            <div>
              <Text strong>Congregation:</Text> <Text>{contact?.added_by.congregation.name}</Text>
            </div>
          </Card>

          </Col>


<Col xs={24} sm={24} md={8} lg={6}>

          {/* Card for Last Discussion */}
          <Card title="Last Discussion">
            <Text>{contact?.last_discussion}</Text>
          </Card>


          </Col>

    <Col xs={24} sm={24} md={8} lg={6}>

          <Card title="Next Discussion">
            <Text>{contact?.next_discussion}</Text>
          </Card>

        </Col>

        <Col xs={24} sm={24} md={8} lg={6}>

<Card title="Publication Offered">
  <Text>{contact?.publication_offered}</Text>
</Card>

</Col>
      </Row>
    </SideMenu>
    )
}

export default MyComponent;