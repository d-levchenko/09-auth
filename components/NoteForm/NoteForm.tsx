'use client';

import { useQueryClient } from '@tanstack/react-query';

import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import useCreateNote from '@/hooks/useCreateNote';

const NoteForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const onCancel = () => router.back();

  const { handleChange, handleFormSubmit, isPending, draft } = useCreateNote(
    queryClient,
    router,
  );

  return (
    <form className={css.form} action={handleFormSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          onChange={handleChange}
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          onChange={handleChange}
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
        />
        <span className={css.error} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          onChange={handleChange}
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        <span className={css.error} />
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
