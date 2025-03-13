import React, { useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

interface User {
  id: string;
  name: string;
  status: 'running' | 'error' | 'stopped';
  createdAt: string;
}

const mockUsers: User[] = Array.from({ length: 10 }, (_, index) => ({
  id: `user-${index + 1}`,
  name: `用户 ${index + 1}`,
  status: ['running', 'error', 'stopped'][Math.floor(Math.random() * 3)] as User['status'],
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

const Users: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    form.setFieldsValue(user);
    setEditModalVisible(true);
  };

  const handleSave = async (values: any) => {
    console.log('Saving user:', values);
    setEditModalVisible(false);
    form.resetFields();
  };

  const columns: ProColumns<User>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      width: 120,
      copyable: false,
    },
    {
      title: '用户名称',
      dataIndex: 'name',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      hideInSearch: true,
      render: (_, record) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          running: { color: '#52c41a', text: '运行中' },
          error: { color: '#ff4d4f', text: '异常' },
          stopped: { color: '#d9d9d9', text: '关闭' },
        };
        const config = statusConfig[record.status];
        return (
          <Space>
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <span>{config.text}</span>
          </Space>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      hideInSearch: true,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      width: 200,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            修改个人信息
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<User>
        columns={columns}
        dataSource={mockUsers}
        rowKey="id"
        actionRef={actionRef}
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            <Button
              key="reset"
              onClick={() => {
                formProps.form?.resetFields();
                formProps.form?.submit();
              }}
            >
              重置
            </Button>,
            <Button
              key="search"
              type="primary"
              onClick={() => {
                formProps.form?.submit();
              }}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>,
          ],
        }}
        dateFormatter="string"
        headerTitle={<div className="text-2xl font-bold">用户列表</div>}
        cardProps={{
          bodyStyle: { padding: 0 }
        }}
        options={false}
      />

      <Modal
        title="修改个人信息"
        open={editModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            label="用户名称"
            name="name"
            rules={[{ required: true, message: '请输入用户名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Users;