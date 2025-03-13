import React, { useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-components';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { Button, Space, Modal, message, Drawer } from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { Desktop, DesktopConnection } from './types';
import {
  initialMockDesktops,
  generateMockConnections,
  getMockDesktopInfo,
  mockDevices,
} from './mockData';
import CreateDesktopModal from './components/CreateDesktopModal';
import DesktopList from './components/DesktopList';

const Desktops: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [infoDrawerVisible, setInfoDrawerVisible] = useState(false);
  const [selectedDesktop, setSelectedDesktop] = useState<Desktop | null>(null);
  const [desktopConnections, setDesktopConnections] = useState<
    DesktopConnection[]
  >([]);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const actionRef = useRef<ActionType>();
  const [searchParams, setSearchParams] = useState<any>({ status: 'running' });
  const [desktops, setDesktops] = useState<Desktop[]>(initialMockDesktops);

  const handleCreate = async (values: { name: string; deviceId: string }) => {
    try {
      const newDesktop: Desktop = {
        id: `desktop-${desktops.length + 1}`,
        name: values.name,
        createdAt: new Date().toISOString(),
        status: 'stopped',
        deviceId: values.deviceId,
        deviceName:
          mockDevices.find((d) => d.id === values.deviceId)?.name || '',
      };

      setDesktops((prev) => [newDesktop, ...prev]);
      message.success('桌面创建成功');
      setCreateModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      message.error('创建失败，请重试');
    }
  };

  const handleStatusChange = async (
    desktop: Desktop,
    newStatus: Desktop['status']
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDesktops((prev) =>
        prev.map((d) => (d.id === desktop.id ? { ...d, status: newStatus } : d))
      );
      message.success(`桌面${newStatus === 'stopped' ? '关闭' : '重启'}成功`);
      actionRef.current?.reload();
    } catch (error) {
      message.error('操作失败，请重试');
    }
  };

  const handleDelete = (desktop: Desktop) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除桌面 "${desktop.name}" 吗？此操作不可恢复。`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        try {
          setDesktops((prev) => prev.filter((d) => d.id !== desktop.id));
          message.success('桌面删除成功');
          actionRef.current?.reload();
        } catch (error) {
          message.error('删除失败，请重试');
        }
      },
    });
  };

  const showDesktopInfo = (desktopId: string) => {
    const info = getMockDesktopInfo(desktopId);
    setSelectedDesktop(desktops.find((d) => d.id === desktopId) || null);
    setDesktopConnections(generateMockConnections(desktopId));
    setInfoDrawerVisible(true);
  };

  const columns: ProColumns<Desktop>[] = [
    {
      title: '桌面ID',
      dataIndex: 'id',
      width: 120,
      copyable: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        running: { text: '运行中', status: 'Success' },
        stopped: { text: '已关闭', status: 'Default' },
        error: { text: '异常', status: 'Error' },
      },
      initialValue: 'running',
      fieldProps: {
        defaultValue: 'running',
      },
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
      title: '桌面名称',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 160,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '所属设备',
      dataIndex: 'deviceName',
      width: 120,
    },
    {
      title: '所属用户',
      dataIndex: 'userName',
      width: 120,
    },
    {
      title: '操作',
      width: 320,
      hideInSearch: true,
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
            type="text"
            icon={<PoweroffOutlined />}
            disabled={record.status === 'stopped'}
            onClick={() => handleStatusChange(record, 'stopped')}
            className="text-gray-500 hover:text-gray-600"
          >
            关闭
          </Button>
          <Button
            type="link"
            icon={<InfoCircleOutlined />}
            onClick={() => showDesktopInfo(record.id)}
          >
            连接信息
          </Button>
          <Button
            type="link"
            icon={<ReloadOutlined />}
            disabled={record.status === 'stopped'}
            onClick={() => handleStatusChange(record, 'running')}
          >
            重启
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const connectionColumns: ProColumns<DesktopConnection>[] = [
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const statusConfig: Record<string, { color: string; text: string }> = {
          running: { color: '#52c41a', text: '运行中' },
          stopped: { color: '#d9d9d9', text: '已关闭' },
          error: { color: '#ff4d4f', text: '异常' },
        };
        const config = statusConfig[status];
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
      key: 'action',
      width: 160,
      render: (_: any, record: DesktopConnection) => (
        <Space>
          <Button type="link" disabled={record.status !== 'running'}>
            连接
          </Button>
          <Button type="link" danger disabled={record.status !== 'running'}>
            断开连接
          </Button>
        </Space>
      ),
    },
  ];

  const filterDesktops = () => {
    let filteredData = [...desktops];

    if (searchParams.name) {
      filteredData = filteredData.filter((desktop) =>
        desktop.name.toLowerCase().includes(searchParams.name.toLowerCase())
      );
    }

    if (searchParams.status) {
      filteredData = filteredData.filter(
        (desktop) => desktop.status === searchParams.status
      );
    }

    if (searchParams.deviceName) {
      filteredData = filteredData.filter(
        (desktop) => desktop.deviceName === searchParams.deviceName
      );
    }

    if (searchParams.userName) {
      filteredData = filteredData.filter(
        (desktop) => desktop.userName === searchParams.userName
      );
    }

    return filteredData;
  };

  const ViewToggleButtons = () => (
    <Space className="ml-4">
      <Button
        type={viewMode === 'list' ? 'primary' : 'default'}
        icon={<UnorderedListOutlined />}
        onClick={() => setViewMode('list')}
      />
      <Button
        type={viewMode === 'card' ? 'primary' : 'default'}
        icon={<AppstoreOutlined />}
        onClick={() => setViewMode('card')}
      />
    </Space>
  );

  return (
    <>
      <ProTable<Desktop>
        columns={columns}
        dataSource={filterDesktops()}
        rowKey="id"
        actionRef={actionRef}
        pagination={{
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
          defaultCollapsed: true,
          defaultValue: {
            status: 'running',
          },
          optionRender: (searchConfig, formProps, dom) => [
            <Button
              key="reset"
              onClick={() => {
                formProps.form?.resetFields();
                formProps.form?.setFieldsValue({ status: 'running' });
                formProps.form?.submit();
                setSearchParams({ status: 'running' });
              }}
            >
              重置
            </Button>,
            <Button
              key="search"
              type="primary"
              onClick={() => {
                const values = formProps.form?.getFieldsValue();
                setSearchParams(values);
                formProps.form?.submit();
              }}
              icon={<SearchOutlined />}
            >
              搜索
            </Button>,
          ],
        }}
        onSubmit={(params) => {
          setSearchParams(params);
        }}
        date
        Formatter="string"
        headerTitle={<div className="text-2xl font-bold">桌面列表</div>}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
            className="mr-2"
          >
            创建桌面
          </Button>,
          <ViewToggleButtons />,
        ]}
        cardProps={{
          bodyStyle: { padding: 0 },
        }}
        tableRender={(_, dom) =>
          viewMode === 'list' ? (
            dom
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-bold">桌面列表</div>
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateModalVisible(true)}
                  >
                    创建桌面
                  </Button>
                  <ViewToggleButtons />
                </Space>
              </div>
              <DesktopList
                desktops={filterDesktops()}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onShowInfo={showDesktopInfo}
              />
            </div>
          )
        }
        options={false}
      />

      <CreateDesktopModal
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onOk={handleCreate}
      />

      <Drawer
        title={`桌面连接信息 - ${selectedDesktop?.name}`}
        placement="right"
        width={800}
        onClose={() => setInfoDrawerVisible(false)}
        open={infoDrawerVisible}
      >
        {selectedDesktop && (
          <ProTable<DesktopConnection>
            columns={connectionColumns}
            dataSource={desktopConnections}
            rowKey="id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ['5', '10', '20'],
              defaultPageSize: 5,
            }}
            search={false}
            options={false}
            dateFormatter="string"
            headerTitle={<div className="text-lg font-medium">连接列表</div>}
            cardProps={{
              bodyStyle: { padding: 0 },
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default Desktops;
