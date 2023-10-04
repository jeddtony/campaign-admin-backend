'use client';

import React from 'react';
import { Button, ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
// import './globals.css';
import Login from './login/page';

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <div className="App" style={{"height": "100vh"}}>
      <Login />
    </div>
  </ConfigProvider>
);

export default HomePage;