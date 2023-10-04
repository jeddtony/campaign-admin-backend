'use client';

import React, { useState, useEffect }  from 'react';
import { HomeOutlined,BarcodeOutlined, ApartmentOutlined, UserOutlined, VideoCameraOutlined, IdcardOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Avatar } from 'antd';
import Link from 'next/link';
import { getProfile } from '@/api/Api';
import { getRole, setCongregation } from '@/helpers/localStorage';

const { Header, Content, Footer, Sider } = Layout;

const SideMenu = ({ children, active }: { children: React.ReactNode, active: string })=> {
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const [detail, setDetail] = useState <any>();
    
      useEffect(() => {
        async function fetch() {
            let result = await getProfile();
            console.log(result);
            setDetail(result);
            setCongregation(result.congregation_id);
        }
    
        fetch();
    }, [])
    
      const menu = (
        <Menu>
          <Menu.Item>
            <strong>Name:</strong> {detail?.name}
          </Menu.Item>
          <Menu.Item>
            <strong>Email:</strong> {detail?.email}
          </Menu.Item>
          <Menu.Item>
            <strong>Congregation:</strong> {detail?.congregation.name}
          </Menu.Item>
          <Menu.Item>
            <strong>Role:</strong> {detail?.role}
          </Menu.Item>
          <Menu.Divider />
          {/* <Menu.Item>
            <Link href="/profile">Profile</Link>
          </Menu.Item> */}
          <Menu.Item>
            <Link href="/login">Logout</Link>
          </Menu.Item>
        </Menu>
      );


      return (
        <Layout style={{'height': 'inherit'}}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          theme="light"
        >
          <div className="demo-logo-vertical" />
           <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[active]}>

                <Menu.Item
                    key="dashboard"
                    icon={<HomeOutlined />}
                    >
                        <Link href="/dashboard">
                        Dashboard
                        </Link>
                    </Menu.Item>
{getRole() === 'admin' && 
                <Menu.Item
                    key="congregations"
                    icon={<BarcodeOutlined />}>
                        <Link href="/congregation">
                        Congregations
                        </Link>
                    </Menu.Item>
                  }
                    <Menu.Item
                    key="publishers"
                    icon={<UserOutlined />}>
                        <Link href="/publishers">
                        Publishers
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                    key="contacts"
                    icon={<ApartmentOutlined />}>
                        <Link href="/contacts">
                        Contacts
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                    key="experiences"
                    icon={<IdcardOutlined />}>
                        <Link href="/experiences">
                        Experiences
                        </Link>
                    </Menu.Item>

                    <Menu.Item
                    key="login"
                    icon={<VideoCameraOutlined />}>
                        <Link href="/login">
                        Logout
                        </Link>
                    </Menu.Item>

                    
            </Menu>
        </Sider>
        <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '24px' }}>
            <Dropdown overlay={menu}>
            <Avatar icon={<UserOutlined />} size="large" style={{ marginRight: '12px' }} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '0px 16px 0' }}>
          <div style={{ padding: 24, paddingRight:24, minHeight: 360, backgroundColor: "transparent" }}>

              {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
      )
}

export default SideMenu;