import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, ShopOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Active Sessions"
              value={423}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={789}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;