'use client';

import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Spin, message, Select, Modal } from 'antd';
import SideMenu from '../../sidemenu';
import { getCongregationList, postPublisher } from '@/api/Api';
import { Congregation } from '@/app/login/page';
import Swal from 'sweetalert2';
import { getCongregation, getRole } from '@/helpers/localStorage';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const MobileResponsiveForm: React.FC = () => {

  const [loading, setLoading] = useState(false);

  const [congregations, setCongregations] = useState<Congregation[]>([]);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const roles: string[] =  ['admin', 'sub-admin', 'user'];

  const handleSuccessModalOk = () => {
    setIsSuccessModalVisible(false);
  };

  useEffect(() => {
    async function fetchCongregations() {
     
        const response = await getCongregationList();
        setCongregations(response.data);
     
    }

    fetchCongregations();
  }, []);

  const onFinish = (values: any) => {
    
    let isAdmin = getRole() === 'admin';

    let formData = {
      name: values.name,
      phone_num: values.phoneNumber,
      email: values.name + "@mail.com",
      congregation_id: isAdmin? values.congregation : getCongregation(),
      type: isAdmin? values.role : 'user',
    }

    const postForm = async() => {
      setLoading(true);
      let results = await postPublisher(formData);
      setLoading(false);
      if(results.status == 'success') {
        message.success('Publisher created successfully');
        
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Publisher created successfully!',
          });

        setTimeout(() => {
            window.location.replace("/congregation");
        }, 3000);
      }
    }
    postForm();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <SideMenu active='publishers'>
      <h1>Add Publisher</h1>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Enter name of publisher!' }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Enter publisher phone number' }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: false, message: 'Enter publishers email' }]}
      >
        <Input size="large" />
      </Form.Item>
{getRole() === 'admin' && (
  <>
 
      <Form.Item
        label="Congregation"
        name="congregation"
        rules={[{ required: true, message: 'Select a congregation' }]}
      >
        <Select placeholder="Select a congregation" size='large'>
          {congregations.map((congregation, index) => (
              <Option key={index} value={congregation.id}>{congregation.name}</Option>
            ))}

          </Select>
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[
          { required: true, message: 'Enter role' },
        ]}
      >
        <Select placeholder="Select a role" size='large' >
          {roles.map((language, index) => (
              <Option key={index} value={language}>{language}</Option>
            ))}

          </Select>
      </Form.Item>

      </>
)} 

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit{loading ? 
          <> &nbsp; &nbsp; <Spin /> </>: ' '}
        </Button>
      </Form.Item>
    </Form>

    <Modal
        title="Success"
        visible={isSuccessModalVisible}
        onOk={handleSuccessModalOk}
        onCancel={handleSuccessModalOk}
        centered
        footer={[
          <Button key="ok" type="primary" onClick={handleSuccessModalOk}>
            OK
          </Button>,
        ]}
      >
        Form submitted successfully!
      </Modal>

    </SideMenu>
  );
};

export default MobileResponsiveForm;
