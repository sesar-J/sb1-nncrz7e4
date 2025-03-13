import React from 'react';
import { Card, Descriptions, Progress, Statistic, Row, Col } from 'antd';
import {
  ClockCircleOutlined,
  LaptopOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const License: React.FC = () => {
  // 模拟数据
  const licenseData = {
    expiryDate: '2025-12-31',
    remainingDays: 365,
    deployedDevices: 45,
    maxDevices: 100,
    currentConnections: 28,
    maxConnections: 50,
  };

  // 计算剩余天数百分比（假设一年为基准）
  const daysPercentage = Math.min(100, (licenseData.remainingDays / 365) * 100);

  // 计算已部署设备百分比
  const devicesPercentage =
    (licenseData.deployedDevices / licenseData.maxDevices) * 100;

  // 计算当前连接数百分比
  const connectionsPercentage =
    (licenseData.currentConnections / licenseData.maxConnections) * 100;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">授权信息</h2>

      <Card className="mb-6">
        <Descriptions
          title="授权详情"
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="授权有效期">
            {licenseData.expiryDate}
          </Descriptions.Item>
          <Descriptions.Item label="剩余授权天数">
            {licenseData.remainingDays} 天
          </Descriptions.Item>
          <Descriptions.Item label="已部署设备数/可部署设备数">
            {licenseData.deployedDevices}/{licenseData.maxDevices}
          </Descriptions.Item>
          <Descriptions.Item label="并发连接数/授权并发连接数">
            {licenseData.currentConnections}/{licenseData.maxConnections}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="剩余授权天数"
              value={licenseData.remainingDays}
              suffix="天"
              prefix={<ClockCircleOutlined />}
              valueStyle={{
                color: daysPercentage > 20 ? '#3f8600' : '#cf1322',
              }}
            />
            <Progress
              percent={daysPercentage.toFixed(1)}
              status={daysPercentage > 20 ? 'normal' : 'exception'}
            />
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="设备使用情况"
              value={licenseData.deployedDevices}
              suffix={`/ ${licenseData.maxDevices}`}
              prefix={<LaptopOutlined />}
              valueStyle={{
                color: devicesPercentage < 80 ? '#3f8600' : '#cf1322',
              }}
            />
            <Progress
              percent={devicesPercentage.toFixed(1)}
              status={devicesPercentage < 80 ? 'normal' : 'exception'}
            />
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="并发连接使用情况"
              value={licenseData.currentConnections}
              suffix={`/ ${licenseData.maxConnections}`}
              prefix={<TeamOutlined />}
              valueStyle={{
                color: connectionsPercentage < 80 ? '#3f8600' : '#cf1322',
              }}
            />
            <Progress
              percent={connectionsPercentage.toFixed(1)}
              status={connectionsPercentage < 80 ? 'normal' : 'exception'}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default License;
