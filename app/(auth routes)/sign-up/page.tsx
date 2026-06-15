'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clientNoteService from '@/lib/api/clientApi';
import useAuthStore from '@/lib/store/authStore';

import css from './SingUp.module.css';
import toast from 'react-hot-toast';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError('');

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      setIsRegistering(true);

      const user = await clientNoteService.register({
        email,
        password,
      });

      setUser({
        email: user.email,
        username: user.username,
        avatar:
          user.avatar ??
          'https://ac.goit.global/fullstack/react/default-avatar.jpg',
      });

      router.push('/profile');
    } catch {
      setError('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            {isRegistering ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
