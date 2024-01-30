'use client';

import React, {useState} from 'react';
import { Row, Col, Card, Typography, Breadcrumb } from 'antd';
import { UserOutlined, ClockCircleOutlined, BarcodeOutlined, RotateLeftOutlined, BookOutlined, HomeOutlined,SnippetsOutlined, 
    VideoCameraOutlined, ApartmentOutlined } from '@ant-design/icons';
import './styles.css';

const { Title, Text } = Typography;

const DashboardStats: React.FC<any> = ({dashboard, students}) => {
  function convertHoursToHoursAndMinutes(totalHours: any) {
    // Convert the total hours to an integer value and calculate remaining minutes
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
  
    return {
      hours: hours,
      minutes: minutes
    };
  }

return (
    <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item> <HomeOutlined /> Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      {/* <h2>Dashboard</h2> */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
            <ClockCircleOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Hours
            </Title>
            <Text strong className="custom-value">
              {/* {dashboard?.hours} */}
              {convertHoursToHoursAndMinutes(dashboard?.hours).hours?? ''}  : {convertHoursToHoursAndMinutes(dashboard?.hours).minutes?? ''}
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
            <SnippetsOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Placements
            </Title>
            <Text strong className="custom-value">
              {dashboard?.placement}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
          <RotateLeftOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Return Visit
            </Title>
            <Text strong className="custom-value">
              {dashboard?.rv}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
          <BookOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Bible Studies
            </Title>
            <Text strong className="custom-value">
              {dashboard?.bs}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
          <VideoCameraOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Video Showing
            </Title>
            <Text strong className="custom-value">
              {dashboard?.video_showing}
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
          <BarcodeOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Congregations
            </Title>
            <Text strong className="custom-value">
              10
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
          <UserOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Publishers
            </Title>
            <Text strong className="custom-value">
              124
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <Card className="custom-card">
          <ApartmentOutlined className="custom-icon" />
            <Title level={4} className="custom-title">
              Contacts
            </Title>
            <Text strong className="custom-value">
            {students}
            </Text>
          </Card>
        </Col>

        {/* Add more cards as needed */}
      </Row>
    </div>
  );
};

export default DashboardStats;
