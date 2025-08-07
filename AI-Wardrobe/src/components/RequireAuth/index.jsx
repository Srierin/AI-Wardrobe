import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import CustomToast from '@/components/CustomToast';

const RequireAuth = ({ children }) => {
  const { isLogin, initUserState } = useUserStore(); // 移除 checkLoginStatus
  const navigate = useNavigate();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true);
      
      try {
        // 初始化用户状态
        await initUserState();
        
        // 检查登录状态
        if (!isLogin) {
          setToastMessage('请先登录');
          setShowToast(true);
          
          // 2秒后跳转
          setTimeout(() => {
            setShowToast(false);
            navigate('/login', { 
              state: { from: location.pathname },
              replace: true 
            });
          }, 2000);
        }
      } catch (error) {
        console.error('认证检查失败:', error);
        setToastMessage('认证检查失败');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [location.pathname]);

  if (isChecking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-40">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">检查登录状态...</p>
        </div>
      </div>
    );
  }

  if (!isLogin) {
    return (
      <>
        {showToast && <CustomToast message={toastMessage} />}
      </>
    );
  }

  return children;
};

export default RequireAuth;