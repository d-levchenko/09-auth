'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import clientNoteService from '@/lib/api/clientApi';

import css from './SingUp.module.css';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setError('');

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await clientNoteService.register({ email, password });
      router.push('/notes/filter/all');
    } catch {
      setError('Registration failed. Please try again.');
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
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignUp;
