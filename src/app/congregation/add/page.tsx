'use client';

import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Spin, message, Select, Modal } from 'antd';
import SideMenu from '../../sidemenu';
import { getCongregationList, postCongregation, postPublisher } from '@/api/Api';
import { Congregation } from '@/app/login/page';
import Swal from 'sweetalert2';

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
    
    let formData = {
      name: values.name,
      territory: values.territory,
      cordinators_name: values.overseer,

    }

    const postForm = async() => {
      setLoading(true);
      let results = await postCongregation(formData);
      // console.log(results);
      setLoading(false);
      if(results.status == 'success') {
        message.success('congregation created successfully');
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Congregation created successfully!',
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
    <SideMenu>
      <h1>Add Congregation</h1>
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
        <Input size="large" placeholder='Enter name of congregation'/>
      </Form.Item>

      <Form.Item
        label="Territory"
        name="territory"
        rules={[{ required: true, message: 'Enter name of Territory!' }]}
      >
        <Input size="large" placeholder='Enter territory to be assigned' />
      </Form.Item>

      <Form.Item
        label="Overseer"
        name="overseer"
        rules={[{ required: true, message: 'Enter name of overseer!' }]}
      >
        <Input size="large" placeholder='Enter name of congregation overseer'/>
      </Form.Item>


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
