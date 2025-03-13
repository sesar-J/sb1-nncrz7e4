import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useIntl } from 'react-intl';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const intl = useIntl();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      await login(values.username, values.password);
      message.success(intl.formatMessage({ id: 'login.success' }));
      navigate('/desktops');
    } catch (error) {
      message.error(intl.formatMessage({ id: 'login.error' }));
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Background image covering the entire page */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/src/assets/login.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/20 z-10" />

      {/* Logo and text in the top-left corner */}
      <div className="absolute top-0 left-0 p-4 z-20">
        <div className="flex items-center">
          <img
            src="data:image/svg+xml,%3Csvg id='_图层_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 250 250'%3E%3Cdefs%3E%3ClinearGradient id='_未命名的渐变_6' x1='37.82' y1='114.17' x2='212.18' y2='114.17' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23004471'/%3E%3Cstop offset='1' stop-color='%23009dda'/%3E%3C/linearGradient%3E%3ClinearGradient id='_未命名的渐变_15' x1='91.47' y1='154.41' x2='212.18' y2='154.41' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23009dda'/%3E%3Cstop offset='1' stop-color='%2300478b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='%23fff' stroke-width='0' d='m53.08,165.19c-3.27,0-5.93-2.66-5.93-5.93v-90.18c0-3.27,2.66-5.93,5.93-5.93h144.36l9.34-9.34H53.08c-8.43,0-15.27,6.84-15.27,15.27v90.18c0,8.43,6.84,15.27,15.27,15.27h32.98l9.34-9.34h-42.32Z'/%3E%3Cpath fill='url(%23_未命名的渐变_6)' stroke-width='0' d='m53.08,165.19c-3.27,0-5.93-2.66-5.93-5.93v-90.18c0-3.27,2.66-5.93,5.93-5.93h144.36l9.34-9.34H53.08c-8.43,0-15.27,6.84-15.27,15.27v90.18c0,8.43,6.84,15.27,15.27,15.27h32.98l9.34-9.34h-42.32Z'/%3E%3Cpath fill='url(%23_未命名的渐变_15)' stroke-width='0' d='m201.61,112.62h-31.48c-1.44,0-2.85.3-4.15.85l-74.52,74.52v8.2h110.15c5.84,0,10.57-4.73,10.57-10.57v-62.43c0-5.84-4.73-10.57-10.57-10.57Z'/%3E%3C/svg%3E"
            alt="Logo"
            className="h-8 mr-2"
          />
          <span className="text-xl font-bold" style={{ color: '#0058aa' }}>
            shadowdesk
          </span>
        </div>
      </div>

      {/* Content container */}
      <div className="w-full flex justify-end items-center relative z-20 pr-40">
        {/* Login form positioned in the right third */}
        <div className="w-full md:w-96 px-8 py-12 mr-10 bg-white/90 backdrop-blur-md rounded-lg shadow-xl ">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {intl.formatMessage({ id: 'app.title' })}
            </h1>
            <p className="text-gray-600">欢迎回来！请登录您的账户</p>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'login.username.required',
                  }),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder={intl.formatMessage({
                  id: 'login.username.placeholder',
                })}
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'login.password.required',
                  }),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={intl.formatMessage({
                  id: 'login.password.placeholder',
                })}
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item className="mb-4">
              <Button
                type="primary"
                htmlType="submit"
                block
                className="h-12 rounded-lg bg-gradient-to-r from-[#0058aa] to-[#0069cc] border-0 hover:from-[#004b91] hover:to-[#005ab3] font-medium"
              >
                {intl.formatMessage({ id: 'app.login' })}
              </Button>
            </Form.Item>

            <div className="text-center space-y-4">
              <div className="text-sm text-gray-500">
                测试账号: 123 / 密码: 456
              </div>
              <div className="text-xs text-gray-400">
                登录即表示您同意我们的服务条款和隐私政策
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
