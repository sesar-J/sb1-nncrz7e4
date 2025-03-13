import React from 'react';
import { Row, Col, Card, Badge, Button, Space, Tooltip } from 'antd';
import {
  LinkOutlined,
  PoweroffOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { Desktop } from '../types';

interface DesktopListProps {
  desktops: Desktop[];
  onStatusChange: (desktop: Desktop, status: Desktop['status']) => void;
  onDelete: (desktop: Desktop) => void;
  onShowInfo: (desktopId: string) => void;
}

const DesktopList: React.FC<DesktopListProps> = ({
  desktops,
  onStatusChange,
  onDelete,
  onShowInfo,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {desktops.map((desktop) => {
        const statusConfig: Record<
          string,
          {
            color: string;
            text: string;
            badgeStatus: 'success' | 'error' | 'default';
          }
        > = {
          running: {
            color: '#52c41a',
            text: '运行中',
            badgeStatus: 'success',
          },
          stopped: {
            color: '#d9d9d9',
            text: '已关闭',
            badgeStatus: 'default',
          },
          error: { color: '#ff4d4f', text: '异常', badgeStatus: 'error' },
        };
        const config = statusConfig[desktop.status];

        return (
          <Col xs={24} sm={12} md={8} lg={6} key={desktop.id}>
            <Card
              styles={{
                header: {
                  padding: '8px 12px',
                  minHeight: 40,
                  backgroundColor: '#e5f0fb',
                },
                body: {
                  padding: 5,
                },
              }}
              hoverable
              className="h-full"
              title={
                <div className="flex items-center justify-between">
                  <span
                    className="font-medium truncate"
                    style={{ maxWidth: '180px' }}
                  >
                    {desktop.name}
                  </span>
                  <Badge status={config.badgeStatus} text={config.text} />
                </div>
              }
            >
              <div className="mb-2">
                <p className="text-gray-500 mb-1">
                  桌面ID: <span className="text-gray-700">{desktop.id}</span>
                </p>
                <p className="text-gray-500 mb-1">
                  所属设备:{' '}
                  <span className="text-gray-700">{desktop.deviceName}</span>
                </p>
                <p className="text-gray-500 mb-1">
                  所属用户:{' '}
                  <span className="text-gray-700">{desktop.userName}</span>
                </p>
                <p className="text-gray-500 mb-1">
                  创建时间:{' '}
                  <span className="text-gray-700">
                    {new Date(desktop.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex justify-between border-t pt-2">
                <div className="grid grid-cols-5 w-full gap-0">
                  <Tooltip title="连接">
                    <Button
                      type="link"
                      icon={<LinkOutlined />}
                      disabled={desktop.status !== 'running'}
                      className="!w-full flex justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="关闭">
                    <Button
                      type="text"
                      icon={<PoweroffOutlined />}
                      disabled={desktop.status === 'stopped'}
                      onClick={() => onStatusChange(desktop, 'stopped')}
                      className="!w-full flex justify-center text-gray-500 hover:text-gray-600"
                    />
                  </Tooltip>
                  <Tooltip title="连接信息">
                    <Button
                      type="link"
                      icon={<InfoCircleOutlined />}
                      onClick={() => onShowInfo(desktop.id)}
                      className="!w-full flex justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="重启">
                    <Button
                      type="link"
                      icon={<ReloadOutlined />}
                      disabled={desktop.status === 'stopped'}
                      onClick={() => onStatusChange(desktop, 'running')}
                      className="!w-full flex justify-center"
                    />
                  </Tooltip>
                  <Tooltip title="删除">
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => onDelete(desktop)}
                      className="!w-full flex justify-center"
                    />
                  </Tooltip>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default DesktopList;