// components/AdminRoute.js
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      router.replace('/login');
    }
  }, [router, userInfo]);

  // Only render the children if the user is an admin
  return userInfo && userInfo.isAdmin ? children : null;
};

export default AdminRoute;
