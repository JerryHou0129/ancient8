import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const handleSubmit = async () => {
    const data = form.getFieldsValue()
    const { username, password } = data
    const payload = {
      username,
      password
    }
    fetch('api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((body) => {
        if(body.statusCode === 401) {
          message.error('You do not have permission')
        } else {
          localStorage.setItem('token', body.accessToken)
          navigate('/admin')
        }
      }).catch(err => {
        console.log('err', err)
      })
  }
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm
        form={form}
        onFinish={handleSubmit}
        title="Ancient 8"
        subTitle="管理平台"
      >
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Username'}
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Password'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
      
      </LoginForm>
    </div>
  );
};

export default LoginPage