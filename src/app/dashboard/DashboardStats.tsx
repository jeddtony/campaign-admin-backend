'use client';

import React from 'react';
import { Row, Col, Card, Typography, Breadcrumb } from 'antd';
import { UserOutlined, ClockCircleOutlined, BarcodeOutlined, RotateLeftOutlined, BookOutlined, HomeOutlined,SnippetsOutlined, 
    VideoCameraOutlined } from '@ant-design/icons';
import './styles.css';

const { Title, Text } = Typography;

const DashboardStats: React.FC<any> = ({dashboard}) => {
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
              {dashboard?.hours}
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
              {dashboard?.video_showing}
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
              {dashboard?.video_showing}
            </Text>
          </Card>
        </Col>

        {/* Add more cards as needed */}
      </Row>
    </div>
  );
};

export default DashboardStats;
