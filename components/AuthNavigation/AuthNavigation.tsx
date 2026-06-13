'use client';

import clientNoteService from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/lib/store/authStore';

import AuthLogoutItem from '../AuthLogoutItem/AuthLogoutItem';
import AuthLoginItem from '../AuthLoginItem/AuthLoginItem';

const AuthNavigation = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated,
  );

  const handleLogout = async () => {
    await clientNoteService.logout();
    clearIsAuthenticated();

    router.push('/sign-in');
  };

  return (
    <>
      {isAuthenticated ? (
        <AuthLogoutItem handleLogout={handleLogout} />
      ) : (
        <AuthLoginItem />
      )}
    </>
  );
};

export default AuthNavigation;
