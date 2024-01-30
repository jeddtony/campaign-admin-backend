'use client'
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Spin, message } from 'antd';
import axios from 'axios';
import { login } from '../../api/Api';
import { setRole, setToken } from '@/helpers/localStorage';

const { Option } = Select;

export interface Congregation {
  id: string;
  name: string;
}

const Login: React.FC = () => {
  const [congregations, setCongregations] = useState<Congregation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCongregations() {
      try {
        const response = await axios.get('https://test.ecofitnesshub.com/api/congregations');
        setCongregations(response.data.data);
      } catch (error) {
        console.error('Error fetching congregations:', error);
      }
    }

    fetchCongregations();
  }, []);

  const onFinish = (values: any) => {
    let formData = {
      phone_number: values.phone_number,
      congregation_id: values.congregation,
    };

    const postForm = async () => {
      setLoading(true);
      let results = await login(formData);
      setLoading(false);
      if (results.status == 'success') {
        console.log('it was successful');
        setToken(results.auth_token);
        setRole(results.role);

        window.location.replace('/dashboard');
      }
    };

    postForm();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: '600px', // Add this line to set a maximum width
        margin: '0 auto', // Center the content horizontally
      }}
    >
      <Form
        name="login"
        initialValues={{ congregation: '', email: '', password: '' }}
        onFinish={onFinish}
        style={{
          border: '1px solid #d9d9d9',
          padding: '20px',
          borderRadius: '5px',
          width: '100%',
        }}
      >
        <h2 style={{ textAlign: 'center' }}> Admin Login</h2>
        <Form.Item
          name="congregation"
          label="Congregation"
          rules={[{ required: false, message: 'Please select a congregation!' }]}
        >
          <Select placeholder="Select a congregation" listHeight={1000}>
            {congregations.map((congregation, index) => (
              <Option key={index} value={congregation.id}>
                {congregation.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: false, message: 'Please input your phone number!' }]}
        >
          <Input type="text" placeholder="Phone Number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin /> : ' Log in'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
