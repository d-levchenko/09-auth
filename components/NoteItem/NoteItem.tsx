import css from './NoteItem.module.css';
import Link from 'next/link';
import { UseMutationResult } from '@tanstack/react-query';
import { Note } from '@/types/note';

interface NoteItemProps {
  note: Note;
  handleDelete: (id: Note['id']) => void;
  mutation: UseMutationResult<Note, Error, string, unknown>;
}

const NoteItem = ({
  note: { title, content, tag, id },
  handleDelete,
  mutation,
}: NoteItemProps) => {
  const isDeleting = mutation.isPending && mutation.variables === id;

  return (
    <li key={id} className={css.listItem}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <Link className={css.link} href={`/notes/${id}`}>
          View details
        </Link>
        <button
          className={css.button}
          onClick={() => handleDelete(id)}
          disabled={mutation.isPending}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
};

export default NoteItem;
