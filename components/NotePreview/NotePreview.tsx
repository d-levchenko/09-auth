import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
}

const NotePreview = ({
  note: { title, content, createdAt, tag },
}: NotePreviewProps) => {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
        </div>
        {tag && <span className={css.tag}>{tag}</span>}
        <p className={css.content}>{content}</p>
        <p className={css.date}>{new Date(createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default NotePreview;
