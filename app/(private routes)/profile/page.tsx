import Image from 'next/image';
import Link from 'next/link';
import serverNoteService from '@/lib/api/serverApi';
import { Metadata } from 'next';

import css from './Profile.module.css';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'Profile Page',

  openGraph: {
    title: 'Profile Page',
    description: 'Profile Page',
    url: 'https://09-auth-gamma-one.vercel.app/profile',
    siteName: 'NoteHub',

    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1244,
        height: 829,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Profile Page',
    description: 'Profile Page',
  },
};

const ProfilePage = async () => {
  const user = await serverNoteService.getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={`/profile/edit`} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            priority
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username ?? 'New User'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
