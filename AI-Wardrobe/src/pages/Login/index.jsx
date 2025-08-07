import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Field, Form } from 'react-vant';
import { UserO, Lock, EyeO, ClosedEye } from '@react-vant/icons';
import { useUserStore } from '@/store/user';
import styles from './login.module.css';

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState(null);
  const { login, isLogin } = useUserStore(); // 添加 isLogin 状态
  const navigate = useNavigate();
  const location = useLocation();
  const loginAttemptRef = useRef(false); // 跟踪登录尝试

  // 获取重定向路径
  const from = location.state?.from || '/home';

  // 监听登录状态变化
  useEffect(() => {
    if (isLogin) {
      console.log('检测到登录状态变化，执行跳转');
      navigate(from, { replace: true });
    }
  }, [isLogin, navigate, from]);

  const handleLogin = async (values) => {
    if (loginAttemptRef.current) return; // 防止重复提交
    loginAttemptRef.current = true;
    
    const { username, password } = values;
    setLoading(true);
    setLoginStatus(null);
    
    try {
      // 手动验证表单
      await form.validateFields();
      
      // 执行登录操作
      await login({ username, password });
      
      // 不在这里跳转，由 useEffect 监听 isLogin 状态变化来处理跳转
      setLoginStatus({ type: 'success', message: '登录成功' });
    } catch (error) {
      setLoginStatus({ 
        type: 'error', 
        message: error.message || '登录失败，请检查用户名和密码' 
      });
    } finally {
      setLoading(false);
      loginAttemptRef.current = false;
    }
  };

  const handleQuickLogin = (username, password) => {
    form.setFieldsValue({ username, password });
    
    // 手动触发表单验证
    form.validateFields()
      .then(() => handleLogin({ username, password }))
      .catch(() => {
        setLoginStatus({ type: 'error', message: '请正确填写表单' });
      });
  };

  // 渲染状态消息
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
      {/* 背景装饰 */}
      <div className={styles.backgroundDecoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      {/* 登录表单 */}
      <div className={styles.loginCard}>
        {/* Logo和标题 */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>👗</div>
          </div>
          <h1 className={styles.title}>AI智能穿搭助手</h1>
          <p className={styles.subtitle}>让AI为你打造专属时尚风格</p>
        </div>

        {/* 状态消息 */}
        {renderStatusMessage()}

        {/* 登录表单 */}
        <Form
          form={form}
          onFinish={handleLogin}
          className={styles.form}
          validateTrigger="onBlur"
        >
          <div className={styles.formGroup}>
            <Field
              name="username"
              placeholder="请输入用户名"
              leftIcon={<UserO />}
              className={styles.input}
              rules={[
                { required: true, message: '请输入用户名' },
                { 
                  min: 3, 
                  message: '用户名至少3个字符',
                  validateTrigger: 'onSubmit' 
                }
              ]}
            />
          </div>

          <div className={styles.formGroup}>
            <Field
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="请输入密码"
              leftIcon={<Lock />}
              rightIcon={
                <div 
                  className={styles.eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeO /> : <ClosedEye />}
                </div>
              }
              className={styles.input}
              rules={[
                { required: true, message: '请输入密码' },
                { 
                  min: 6, 
                  message: '密码至少6个字符',
                  validateTrigger: 'onSubmit'
                }
              ]}
            />
          </div>

          <Button
            type="primary"
            nativeType="submit"
            loading={loading}
            className={styles.loginButton}
            block
          >
            {loading ? '登录中...' : '立即登录'}
          </Button>
        </Form>

        {/* 快速登录 */}
        <div className={styles.quickLogin}>
          <p className={styles.quickLoginTitle}>快速登录</p>
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

        {/* 登录提示 */}
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

        {/* 功能介绍 */}
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

      {/* 底部信息 */}
      <div className={styles.footer}>
        <p>© 2024 AI智能穿搭助手 - 让时尚更简单</p>
      </div>
    </div>
  );
};

export default Login;
