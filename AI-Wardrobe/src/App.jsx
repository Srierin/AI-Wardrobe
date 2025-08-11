import { Suspense, lazy, useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import RequireAuth from '@/components/RequireAuth';
import CustomToast from '@/components/CustomToast'; // 导入新组件
import './App.css';


// 懒加载页面组件
const Home = lazy(() => import('@/pages/Home'));
const Discover = lazy(() => import('@/pages/Discover'));
const Messages = lazy(() => import('@/pages/Messages'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const Profile = lazy(() => import('@/pages/Profile'));
const Login = lazy(() => import('@/pages/Login'));
const Wardrobe = lazy(() => import('@/pages/Wardrobe'));
const Coze = lazy(() => import('@/pages/Coze'));
const Search = lazy(() => import('@/pages/Search'));
const Text = lazy(() => import('@/pages/Text'));

// 加载组件
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">加载中...</p>
    </div>
  </div>
);

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, showToast: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    this.setState({ showToast: true });
    
    // 3秒后自动隐藏错误提示
    setTimeout(() => {
      this.setState({ showToast: false });
    }, 3000);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, textAlign: 'center' }}>
          <h2>出错了</h2>
          <p>{this.state.error?.message || '未知错误'}</p>
          <button onClick={() => window.location.reload()}>刷新页面</button>
          
          {this.state.showToast && (
            <CustomToast 
              message="应用发生错误，请刷新页面" 
              type="error" 
            />
          )}
        </div>
      );
    }
    
    return this.props.children;
  }
}


function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* 登录页面 - 不需要鉴权 */}
              <Route path="/login" element={<Login />} />

              {/* 需要登录的页面 */}
              <Route element={
                <RequireAuth>
                  <MainLayout />
                </RequireAuth>
              }>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/coze" element={<Coze />} />
                <Route path="/search" element={<Search />} />
                <Route path="/text" element={<Text />} />
                <Route path="/wardrobe" element={<Wardrobe />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* 收藏页面 - 独立路由，不在底部导航中显示 */}
              <Route path="/favorites" element={
                <RequireAuth>
                  <Favorites />
                </RequireAuth>
              } />

              {/* 404页面 */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;