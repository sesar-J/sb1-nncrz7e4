import React from 'react';
import { Card, Form, Input, Switch, Button, Space, Divider, List } from 'antd';
import { useCheckpoint } from '../context/CheckpointContext';
import { useIntl } from 'react-intl';

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const { checkpoints, rollback, canRollback, createCheckpoint } = useCheckpoint();
  const intl = useIntl();

  const onFinish = (values: any) => {
    createCheckpoint('Settings updated', values);
    console.log('Success:', values);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">系统设置</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              siteName: '远程桌面管理系统',
              emailNotifications: true,
              darkMode: false,
            }}
          >
            <Form.Item
              label="站点名称"
              name="siteName"
              rules={[{ required: true, message: '请输入站点名称！' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="邮件通知"
              name="emailNotifications"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item 
              label="深色模式" 
              name="darkMode" 
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  保存更改
                </Button>
                <Button onClick={() => form.resetFields()}>
                  重置
                </Button>
                <Button 
                  onClick={() => rollback()} 
                  disabled={!canRollback}
                >
                  回滚到上一个检查点
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card title="检查点历史">
          <List
            dataSource={checkpoints}
            renderItem={(checkpoint, index) => (
              <List.Item
                actions={[
                  <Button 
                    key="rollback"
                    size="small"
                    onClick={() => rollback(checkpoints.length - index)}
                  >
                    回滚到此处
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={checkpoint.description}
                  description={new Date(checkpoint.timestamp).toLocaleString()}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default Settings;