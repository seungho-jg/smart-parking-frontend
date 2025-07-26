import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '홈' },
    { path: '/reservations', label: '예약' },
    { path: '/my-page', label: '마이페이지' },
  ];

  // 로그인 및 회원가입 페이지에서 네비게이션 숨김
  if (['/login', '/sign-up'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t-md">
      <div className="flex justify-around max-w-screen-sm mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-3 text-sm ${
              location.pathname === item.path
                ? 'text-blue-600'
                : 'text-gray-500'
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;