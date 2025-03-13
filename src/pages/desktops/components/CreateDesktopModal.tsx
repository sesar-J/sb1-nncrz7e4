import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { CreateDesktopForm } from '../types';
import { mockDevices } from '../mockData';

interface CreateDesktopModalProps {
  open: boolean;
  onCancel: () => void;
  onOk: (values: CreateDesktopForm) => void;
}

const CreateDesktopModal: React.FC<CreateDesktopModalProps> = ({
  open,
  onCancel,
  onOk,
}) => {
  const [form] = Form.useForm<CreateDesktopForm>();

  return (
    <Modal
      title="创建桌面"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onOk}
        className="pt-4"
      >
        <Form.Item
          label="桌面名称"
          name="name"
          rules={[
            { required: true, message: '请输入桌面名称' },
            { min: 2, message: '桌面名称至少2个字符' },
            { max: 50, message: '桌面名称最多50个字符' },
          ]}
        >
          <Input placeholder="请输入桌面名称" />
        </Form.Item>

        <Form.Item
          label="登录节点"
          name="deviceId"
          rules={[{ required: true, message: '请选择登录节点' }]}
        >
          <Select placeholder="请选择登录节点">
            {mockDevices.map((device) => (
              <Select.Option key={device.id} value={device.id}>
                {device.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDesktopModal;