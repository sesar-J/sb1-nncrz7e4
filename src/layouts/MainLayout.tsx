import React, { useState } from 'react';
import { Layout, Menu, Button, Dropdown, Space, Avatar, Select, Tooltip, Modal, Form, Input, message } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  DesktopOutlined,
  HddOutlined,
  ApiOutlined,
  FileSearchOutlined,
  GlobalOutlined,
  AlertOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import LoginModal from '../components/LoginModal';
import { useIntl } from 'react-intl';

const { Header, Content, Sider } = Layout;
const { Option } = Select;

interface ProfileFormData {
  name: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, updateProfile } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const intl = useIntl();
  const [form] = Form.useForm<ProfileFormData>();
  
  const menuItems = [
    {
      key: '/desktops',
      icon: <DesktopOutlined />,
      label: intl.formatMessage({ id: 'menu.desktops' }),
    },
    {
      key: '/devices',
      icon: <HddOutlined />,
      label: intl.formatMessage({ id: 'menu.devices' }),
    },
    {
      key: '/connections',
      icon: <ApiOutlined />,
      label: intl.formatMessage({ id: 'menu.connections' }),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: intl.formatMessage({ id: 'menu.users' }),
    },
    {
      key: 'logs',
      icon: <FileSearchOutlined />,
      label: intl.formatMessage({ id: 'menu.logs' }),
      children: [
        {
          key: '/logs/info',
          icon: <FileSearchOutlined />,
          label: intl.formatMessage({ id: 'menu.logs.info' }),
        },
        {
          key: '/logs/exceptions',
          icon: <AlertOutlined />,
          label: intl.formatMessage({ id: 'menu.logs.exceptions' }),
        },
        {
          key: '/logs/history',
          icon: <HistoryOutlined />,
          label: intl.formatMessage({ id: 'menu.logs.history' }),
        },
      ],
    },
    {
      key: '/license',
      icon: <KeyOutlined />,
      label: '授权信息',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = async (values: ProfileFormData) => {
    try {
      if (values.newPassword) {
        if (values.oldPassword !== '456') {
          message.error('原密码错误');
          return;
        }
        if (values.newPassword !== values.confirmPassword) {
          message.error('两次输入的新密码不一致');
          return;
        }
      }

      await updateProfile({
        name: values.name,
        password: values.newPassword,
      });

      message.success('个人信息更新成功');
      setProfileModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('更新失败，请重试');
    }
  };

  const userDropdownItems = {
    items: [
      {
        key: 'profile',
        icon: <EditOutlined />,
        label: '修改个人信息',
        onClick: () => {
          form.setFieldsValue({ name: currentUser?.name });
          setProfileModalOpen(true);
        },
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: intl.formatMessage({ id: 'app.logout' }),
        onClick: handleLogout,
      },
    ],
  };

  const openDocs = () => {
    window.open(locale === 'zh-CN' ? 'https://docs-cn.example.com' : 'https://docs.example.com', '_blank');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center">
            <img 
              src="data:image/svg+xml,%3Csvg id='_图层_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 250 250'%3E%3Cdefs%3E%3ClinearGradient id='_未命名的渐变_6' x1='37.82' y1='114.17' x2='212.18' y2='114.17' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23004471'/%3E%3Cstop offset='1' stop-color='%23009dda'/%3E%3C/linearGradient%3E%3ClinearGradient id='_未命名的渐变_15' x1='91.47' y1='154.41' x2='212.18' y2='154.41' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23009dda'/%3E%3Cstop offset='1' stop-color='%2300478b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='%23fff' stroke-width='0' d='m53.08,165.19c-3.27,0-5.93-2.66-5.93-5.93v-90.18c0-3.27,2.66-5.93,5.93-5.93h144.36l9.34-9.34H53.08c-8.43,0-15.27,6.84-15.27,15.27v90.18c0,8.43,6.84,15.27,15.27,15.27h32.98l9.34-9.34h-42.32Z'/%3E%3Cpath fill='url(%23_未命名的渐变_6)' stroke-width='0' d='m53.08,165.19c-3.27,0-5.93-2.66-5.93-5.93v-90.18c0-3.27,2.66-5.93,5.93-5.93h144.36l9.34-9.34H53.08c-8.43,0-15.27,6.84-15.27,15.27v90.18c0,8.43,6.84,15.27,15.27,15.27h32.98l9.34-9.34h-42.32Z'/%3E%3Cpath fill='url(%23_未命名的渐变_15)' stroke-width='0' d='m201.61,112.62h-31.48c-1.44,0-2.85.3-4.15.85l-74.52,74.52v8.2h110.15c5.84,0,10.57-4.73,10.57-10.57v-62.43c0-5.84-4.73-10.57-10.57-10.57Z'/%3E%3C/svg%3E"
              alt="Logo"
              className="h-8 mr-4"
            />
            <div className="text-xl font-bold text-gray-800">
              {intl.formatMessage({ id: 'app.title' })}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Tooltip title={intl.formatMessage({ id: 'app.documentation' })} overlayStyle={{ body: {} }}>
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                onClick={openDocs}
                className="flex items-center hover:bg-gray-50"
              >
                {intl.formatMessage({ id: 'app.documentation' })}
              </Button>
            </Tooltip>
            <Select
              value={locale}
              onChange={setLocale}
              style={{ width: 100 }}
              options={[
                { value: 'zh-CN', label: '中文' },
                { value: 'en-US', label: 'English' },
              ]}
            />
            {currentUser ? (
              <Dropdown menu={userDropdownItems}>
                <Space className="cursor-pointer">
                  <Avatar src={currentUser.avatar} />
                  <span className="text-gray-700">{currentUser.name}</span>
                </Space>
              </Dropdown>
            ) : (
              <Button type="primary" onClick={() => setLoginModalOpen(true)}>
                {intl.formatMessage({ id: 'app.login' })}
              </Button>
            )}
          </div>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['logs']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <LoginModal
        open={loginModalOpen}
        onCancel={() => setLoginModalOpen(false)}
      />
      <Modal
        title="修改个人信息"
        open={profileModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setProfileModalOpen(false);
          form.resetFields();
        }}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入新的用户名" />
          </Form.Item>
          <Form.Item
            label="原密码"
            name="oldPassword"
          >
            <Input.Password placeholder="请输入原密码" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { 
                validator: async (_, value) => {
                  if (value && value.length < 6) {
                    throw new Error('密码长度不能小于6位');
                  }
                }
              }
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { 
                validator: async (_, value) => {
                  if (form.getFieldValue('newPassword') && !value) {
                    throw new Error('请确认新密码');
                  }
                }
              }
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MainLayout;