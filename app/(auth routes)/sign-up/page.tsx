'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterRequest } from '@/lib/api/clientApi';
import clientNoteService from '@/lib/api/clientApi';

import css from './SingUp.module.css';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(
        formData,
      ) as unknown as RegisterRequest;
      const res = await clientNoteService.register(formValues);

      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <label className={css.formGroup}>
          Username
          <input
            className={css.formInput}
            type="text"
            name="userName"
            required
          />
        </label>
        <label className={css.formGroup}>
          Email
          <input className={css.formInput} type="email" name="email" required />
        </label>
        <label className={css.formGroup}>
          Password
          <input
            className={css.formInput}
            type="password"
            name="password"
            required
          />
        </label>
        <button className={css.submitButton} type="submit">
          Register
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </main>
  );
};

export default SignUp;
