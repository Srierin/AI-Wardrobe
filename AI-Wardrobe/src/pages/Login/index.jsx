import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Field, Form } from 'react-vant';
import { UserO, Lock, EyeO, ClosedEye } from '@react-vant/icons';
import { useUserStore } from '@/store/user';
import styles from './login.module.css';
import useTitle from "@/hooks/useTitle";

const Login = () => {
  useTitle('登录');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const { login, isLogin } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const loginAttemptRef = useRef(false);

  const from = location.state?.from || '/home';

  useEffect(() => {
    if (isLogin) {
      navigate(from, { replace: true });
    }
  }, [isLogin, navigate, from]);

  const handleSubmit = async (values) => {
    if (loginAttemptRef.current) return;
    loginAttemptRef.current = true;

    setLoading(true);
    setLoginStatus(null);

    try {
      await form.validateFields();

      const { username, password } = values;
      await login({ username, password });

      setLoginStatus({
        type: 'success',
        message: '登录成功'
      });
    } catch (error) {
      console.error('登录错误:', error);
      setLoginStatus({
        type: 'error',
        message: error.message || '登录失败，请检查账号和密码'
      });
    } finally {
      setLoading(false);
      loginAttemptRef.current = false;
    }
  };

  const handleQuickLogin = (username, password) => {
    form.setFieldsValue({ username, password });
    handleSubmit({ username, password });
  };

  const renderStatusMessage = () => {
    if (!loginStatus) return null;

    return (
      <div className={
        loginStatus.type === 'success'
          ? styles.successMessage
          : styles.errorMessage
      }>
        {loginStatus.message}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundDecoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>👗</div>
          </div>
          <h1 className={styles.title}>AI智能穿搭助手</h1>
          <p className={styles.subtitle}>让AI为你打造专属时尚风格</p>
        </div>

        {renderStatusMessage()}

        <Form
          form={form}
          onFinish={handleSubmit}
          className={styles.form}
          validateTrigger="onBlur"
        >
          <div className={styles.formGroup}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入账号' },
                { min: 3, message: '账号至少3个字符' }
              ]}
            >
              <Field
                placeholder="请输入账号"
                leftIcon={<UserO />}
                className={styles.input}
              />
            </Form.Item>
          </div>

          <div className={styles.formGroup}>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' }
              ]}
            >
              <Field
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                leftIcon={<Lock />}
                rightIcon={
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeO /> : <ClosedEye />}
                  </div>
                }
                className={styles.input}
              />
            </Form.Item>
          </div>

          <Button type="primary" nativeType="submit" loading={loading} block>
            {loading ? '登录中...' : '立即登录'}
          </Button>
        </Form>

        <div className={styles.quickLogin}>
          <p className={styles.quickLoginTitle}>快捷登录</p>
          <div className={styles.quickLoginButtons}>
            <Button
              size="small"
              className={styles.quickButton}
              onClick={() => handleQuickLogin('admin', '123456')}
            >
              管理员账号
            </Button>
            <Button
              size="small"
              className={styles.quickButton}
              onClick={() => handleQuickLogin('user', '123456')}
            >
              普通用户
            </Button>
          </div>
        </div>

        <div className={styles.loginTips}>
          <div className={styles.tipItem}>
            <span className={styles.tipLabel}>测试账号:</span>
            <span className={styles.tipValue}>admin / 123456</span>
          </div>
          <div className={styles.tipItem}>
            <span className={styles.tipLabel}>普通账号:</span>
            <span className={styles.tipValue}>user / 123456</span>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎨</div>
            <div className={styles.featureText}>AI智能搭配</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📱</div>
            <div className={styles.featureText}>个性化推荐</div>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💫</div>
            <div className={styles.featureText}>时尚灵感</div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p>© 2024 AI智能穿搭助手 - 让时尚更简单</p>
      </div>
    </div>
  );
};

export default Login;