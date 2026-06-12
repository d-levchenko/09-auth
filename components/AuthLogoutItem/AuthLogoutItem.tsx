import css from '../AuthNavigation/AuthNavigation.module.css';
import Link from 'next/link';

interface AuthLogoutItemProps {
  handleLogout: () => void;
}

const AuthLogoutItem = ({ handleLogout }: AuthLogoutItemProps) => {
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
        <p className={css.userEmail}>User email</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  );
};

export default AuthLogoutItem;
