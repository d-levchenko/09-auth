'use client';

import Link from 'next/link';
import useAuthStore from '@/lib/store/authStore';

import css from '../AuthNavigation/AuthNavigation.module.css';

interface AuthLogoutItemProps {
  handleLogout: () => void;
}

const AuthLogoutItem = ({ handleLogout }: AuthLogoutItemProps) => {
  const user = useAuthStore(state => state.user);

  return (
    <>
      <li>
        <Link href="/notes/filter/all">Notes</Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}> {user?.email} </p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  );
};

export default AuthLogoutItem;
