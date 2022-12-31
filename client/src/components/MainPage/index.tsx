import * as React from 'react'
import axios from 'axios'
import { Form, Input, Upload, Button, Modal, message } from 'antd'
import { InboxOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const MainPage: React.FC = () => {
  const [form] = Form.useForm()
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList.slice(-1);
  };

  const formData = new FormData();

  const handleSubmit = async () => {
    const data = form.getFieldsValue()
    console.log(data)
    const { name, id, pics } = data

    formData.delete('name');
    formData.delete('id');
    formData.delete('pic');

    formData.append('name', name);
    formData.append('id', id);
    formData.append('pic', pics[0].originFileObj);

    console.log(formData.get('pic'))
    axios({

      headers: {
        'Content-Type': 'multipart/form-data', // 表单类型
      },
      method: 'POST',
      url: 'api/',
      data: formData,
    }).then(
      () => {
        message.success('Submit finished')
        form.resetFields()
      },
      (error: any) => {
        console.log('error->', error);
      }
    )
  }



const showConfirm = () => {
  confirm({
    title: 'Do you Want to submit this item?',
    icon: <ExclamationCircleFilled />,
    content: 'You cannot undo this action',
    onOk() {
      handleSubmit()
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
  return (
    <>
      <Form form={form} {...formItemLayout} style={{ padding: '24px'}}>
        <Form.Item label='Name' name='name'>
          <Input></Input>
        </Form.Item>
        <Form.Item label='ID' name='id'>
          <Input></Input>
        </Form.Item>

        <Form.Item label="Photo ID">
          <Form.Item name="pics" valuePropName="fileList" noStyle getValueFromEvent={normFile}>
            <Upload.Dragger name="files" beforeUpload={() => false} >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 12, offset: 18 }}>
          <Button type="primary" htmlType="submit" onClick={showConfirm}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default MainPage