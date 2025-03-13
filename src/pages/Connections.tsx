import React, { useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { LinkOutlined, DisconnectOutlined, SearchOutlined } from '@ant-design/icons';

interface Connection {
  id: string;
  ip: string;
  browser: string;
  desktopName: string;
  deviceName: string;
  username: string;
  createdAt: string;
  status: 'running' | 'error' | 'stopped';
}

const mockConnections: Connection[] = Array.from({ length: 10 }, (_, index) => ({
  id: `conn-${index + 1}`,
  ip: `192.168.1.${index + 100}`,
  browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
  desktopName: `桌面 ${index + 1}`,
  deviceName: `设备 ${index + 1}`,
  username: `用户 ${Math.floor(Math.random() * 5) + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  status: ['running', 'error', 'stopped'][Math.floor(Math.random() * 3)] as Connection['status'],
}));

const mockUsers = [
  { label: 'admin', value: 'admin' },
  { label: 'user1', value: 'user1' },
  { label: 'system', value: 'system' },
];

const mockCategories = [
  { label: '系统', value: '系统' },
  { label: '用户活动', value: '用户活动' },
  { label: '安全', value: '安全' },
  { label: '性能', value: '性能' },
];

const mockLevels = [
  { label: '信息', value: 'info' },
  { label: '警告', value: 'warning' },
  { label: '错误', value: 'error' },
];

const Connections: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Connection>[] = [
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 120,
      hideInSearch: true,
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      width: 120,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        placeholder: '请选择用户',
        options: Array.from(new Set(mockConnections.map(conn => conn.username))).map(username => ({
          label: username,
          value: username,
        })),
      },
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      width: 100,
      valueType: 'select',
      valueEnum: {
        Chrome: { text: 'Chrome' },
        Firefox: { text: 'Firefox' },
        Safari: { text: 'Safari' },
        Edge: { text: 'Edge' },
      },
    },
    {
      title: '桌面名称',
      dataIndex: 'desktopName',
      width: 120,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString(),
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
      title: '操作',
      width: 200,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<LinkOutlined />}
            disabled={record.status !== 'running'}
          >
            连接
          </Button>
          <Button
            type="link"
            danger
            icon={<DisconnectOutlined />}
            disabled={record.status !== 'running'}
          >
            断开连接
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<Connection>
      columns={columns}
      dataSource={mockConnections}
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
      headerTitle={<div className="text-2xl font-bold">连接列表</div>}
      cardProps={{
        bodyStyle: { padding: 0 }
      }}
      options={false}
    />
  );
};

export default Connections;