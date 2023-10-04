'use client';

import React, {useState, useEffect} from 'react'
import { Card, Avatar, Typography, Divider, Tabs, Collapse, Space, Button, List } from 'antd';
import { getPublisherDetail } from '@/api/Api';
import SideMenu from '@/app/sidemenu';
import {PhoneOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Meta } = Card;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const cardStyle = {
    marginBottom: '16px', // Add some spacing between cards
    borderRadius: '8px',  // Add rounded corners to the cards
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
  };

  type StatusStyles = {
    [key: string]: React.CSSProperties;
  };

  const statusStyles: StatusStyles = {
    'submitted': { color: 'white', backgroundColor: 'rgb(50 135 50)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '5px' },
    'not-submitted': { color: 'white', backgroundColor: 'rgb(225 37 37)', fontWeight: 'bold', padding: '4px 8px', borderRadius: '5px' },
};


const UserProfile = ({params}: any) => {

    const id = params?.id;
    const [activeTab, setActiveTab] = useState('experiences');
    const [publisherInfo, setPublisherInfo] = useState<any>();
    const [experiences, setExperiences] = useState<any[]> ([]);
    const [contacts, setContacts] = useState<any[]> ([]);
    const [report, setReport] = useState<any>();

    let user = {
        avatar: '',
        name: '',
        email: ''
    };

    const handleTabChange = (key: any) => {
        setActiveTab(key);
      };

    useEffect(() => {
        async function fetch() {
            let result = await getPublisherDetail(id);
            console.log(result);
            setPublisherInfo(result.data?.publishers_info);
            setReport(result.data?.reports.report);
            setExperiences(result.data?.experiences);
            setContacts(result.data?.contacts);
            
        }

        fetch();
    }, [])

    const getStatus = (text: string) => {
       let status = text.toLowerCase();

        const style = statusStyles[status] || {};

        return <span style={style}>{text}</span>;
    }

  return (

    <SideMenu active='publishers'>
        <Card>
      <div style={{ display: 'flex'}}>
      <div style={{ flex: 1, border: '1px solid #e8e8e8', padding: '16px'}}>
      <Avatar size={128} icon={<UserOutlined />}/>
      <Divider />
      <Title level={2}>{publisherInfo?.name}</Title>
      <Text>{publisherInfo?.email}</Text>
      <Divider />
      <Text strong>Congregation:</Text> <Text>{publisherInfo?.congregation.name}</Text>
      <Divider />
      <Text strong>Report Status:</Text> <Text>{getStatus(publisherInfo?.submission_status?? '')}</Text>
      <Divider />
      <Text strong>Hours:</Text> <Text>{report?.hours}</Text>
      <Divider />
      <Text strong>Placements:</Text> <Text>{report?.placement}</Text>
      <Divider />
      <Text strong>Video Showings:</Text> <Text>{report?.video_showing}</Text>
      <Divider />
      <Text strong>Return Visits:</Text> <Text>{report?.rv}</Text>
      <Divider />
      <Text strong>Bible Studies:</Text> <Text>{report?.rv}</Text>
    </div>

    <div style={{ flex: 2, border: '1px solid #e8e8e8', padding: '16px' }}>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Experiences" key="experiences">
            
          <Space direction="vertical">
            {experiences.map( (experience, index) => (
    <Collapse
    collapsible="header"
    defaultActiveKey={[index]}
    items={[
      {
        key: index,
        label: experience.title,
        children: <p>{experience.experiences}</p>,
      },
    ]}
  />
            ))}
      </Space>
          </TabPane>
          <TabPane tab="Contacts" key="contacts">
          <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
      }}
      dataSource={contacts}
      renderItem={(contact) => (
        <List.Item>
          <Card style={cardStyle}>
            <Card.Meta
              avatar={<Avatar src={contact.avatar} />}
              title={contact.name}
              description={contact.email}
            />
            <p><PhoneOutlined /> {contact.phone_number}</p>
            <p><HomeOutlined /> {contact.address}</p>
            {/* <p><EnvironmentOutlined /> <a>Click to view on map</a>{contact.coordinates}</p> */}
            <Link href={`/contacts/${contact.id}`}>
                
                  <Button type="primary">View</Button>
                
              </Link>
          </Card>
        </List.Item>
      )}
    />


          </TabPane>
        </Tabs>
      </div>
    </div>
    </Card>
    </SideMenu>
  );
};

export default UserProfile;
