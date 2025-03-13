import React, { useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, message, Drawer } from 'antd';
import {
  DesktopOutlined,
  DeleteOutlined,
  SearchOutlined,
  LinkOutlined,
  ReloadOutlined,
  PoweroffOutlined,
  DisconnectOutlined,
} from '@ant-design/icons';

interface Device {
  id: string;
  name: string;
  createdAt: string;
  status: 'running' | 'error' | 'stopped';
}

interface DeviceDesktop {
  id: string;
  name: string;
  ip: string;
  createdAt: string;
  status: 'running' | 'error' | 'stopped';
}

const mockDevices: Device[] = Array.from({ length: 10 }, (_, index) => ({
  id: `device-${index + 1}`,
  name: `设备 ${index + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
  status: ['running', 'error', 'stopped'][
    Math.floor(Math.random() * 3)
  ] as Device['status'],
}));

// 生成设备桌面数据
const generateMockDeviceDesktops = (deviceId: string): DeviceDesktop[] => {
  const desktopCount = Math.floor(Math.random() * 8) + 2; // 2-10个桌面
  return Array.from({ length: desktopCount }, (_, index) => ({
    id: `desktop-${deviceId}-${index + 1}`,
    name: `桌面-${index + 1}`,
    ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    status: ['running', 'error', 'stopped'][
      Math.floor(Math.random() * 3)
    ] as DeviceDesktop['status'],
  }));
};

const Devices: React.FC = () => {
  const [dataSource, setDataSource] = useState<Device[]>(mockDevices);
  const [desktopDrawerVisible, setDesktopDrawerVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceDesktops, setDeviceDesktops] = useState<DeviceDesktop[]>([]);
  const actionRef = useRef<ActionType>();

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此设备吗？此操作不可恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        setDataSource((prev) => prev.filter((device) => device.id !== id));
        message.success('设备已成功删除');
      },
    });
  };

  const showDeviceDesktops = (device: Device) => {
    setSelectedDevice(device);
    setDeviceDesktops(generateMockDeviceDesktops(device.id));
    setDesktopDrawerVisible(true);
  };

  const columns: ProColumns<Device>[] = [
    {
      title: '设备ID',
      dataIndex: 'id',
      width: 120,
      copyable: false,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      width: 150,
      fieldProps: {
        placeholder: '请输入设备名称',
      },
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
      valueEnum: {
        running: { text: '运行中', status: 'Success' },
        error: { text: '异常', status: 'Error' },
        stopped: { text: '关闭', status: 'Default' },
      },
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
      hideInSearch: true,
    },
    {
      title: '操作',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<DesktopOutlined />}
            onClick={() => showDeviceDesktops(record)}
          >
            桌面列表
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
      hideInSearch: true,
    },
  ];

  // 设备桌面列表的列定义
  const desktopColumns: ProColumns<DeviceDesktop>[] = [
    {
      title: '桌面ID',
      dataIndex: 'id',
      width: 120,
      copyable: false,
    },
    {
      title: '桌面名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 160,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          running: { color: '#52c41a', text: '运行中' },
          stopped: { color: '#d9d9d9', text: '已关闭' },
          error: { color: '#ff4d4f', text: '异常' },
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
      width: 300,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<LinkOutlined />}
            disabled={record.status !== 'running'}
          >
            连接
          </Button>
          <Button
            type="link"
            icon={<ReloadOutlined />}
            disabled={record.status === 'stopped'}
          >
            重启
          </Button>
          <Button
            type="text"
            icon={<PoweroffOutlined />}
            disabled={record.status === 'stopped'}
            className="text-gray-500 hover:text-gray-600"
          >
            关闭
          </Button>
          <Button type="text" danger icon={<DeleteOutlined />}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable<Device>
        columns={columns}
        dataSource={dataSource}
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
        headerTitle={<div className="text-2xl font-bold">设备列表</div>}
        cardProps={{
          bodyStyle: { padding: 0 },
        }}
        options={false}
      />

      <Drawer
        title={`设备桌面列表 - ${selectedDevice?.name}`}
        placement="right"
        width={1000}
        onClose={() => setDesktopDrawerVisible(false)}
        open={desktopDrawerVisible}
      >
        {selectedDevice && (
          <ProTable<DeviceDesktop>
            columns={desktopColumns}
            dataSource={deviceDesktops}
            rowKey="id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
              defaultPageSize: 10,
            }}
            search={false}
            options={false}
            dateFormatter="string"
            headerTitle={<div className="text-lg font-medium">桌面列表</div>}
            cardProps={{
              bodyStyle: { padding: 0 },
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default Devices;
