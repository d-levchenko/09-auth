'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import clientNoteService from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';
import toast from 'react-hot-toast';

const EditProfilePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const setUser = useAuthStore(state => state.setUser);
  const user = useAuthStore(state => state.user);

  const [avatar, setAvatar] = useState(
    user?.avatar ?? 'https://ac.goit.global/fullstack/react/default-avatar.jpg',
  );

  useEffect(() => {
    clientNoteService.getMe().then(({ username, email, avatar }) => {
      setUserName(username ?? '');
      setUserEmail(email ?? '');
      setAvatar(avatar);
    });
  }, []);

  const handleCancel = () => {
    router.back();
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEditingProfile = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get('username') as string;
    setIsSaving(true);

    try {
      await clientNoteService.updateMe({
        username: userName,
      });

      setUser({
        username: userName,
        email: userEmail,
        avatar,
      });

      toast.success('Profile updated successfully.');
      router.push('/profile');
    } catch {
      if (userName.length === 0) return toast.error('Username is required');

      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          loading="eager"
        />

        <form onSubmit={handleEditingProfile} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {userName}</label>
            <input
              onChange={handleUserNameChange}
              value={userName}
              id="username"
              name="username"
              type="text"
              className={css.input}
            />
          </div>

          <p>Email: {userEmail}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
