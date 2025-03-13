import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { LoginForm } from '../types/user';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  open: boolean;
  onCancel: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const handleLogin = async (values: LoginForm) => {
    try {
      await login(values.username, values.password);
      message.success('Login successful');
      form.resetFields();
      onCancel();
    } catch (error) {
      message.error('Invalid credentials');
    }
  };

  return (
    <Modal
      title="Login"
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;