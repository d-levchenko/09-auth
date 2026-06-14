import NoteForm from '@/components/NoteForm/NoteForm';
import styles from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create note',

  openGraph: {
    title: 'Create note',
    description: 'Create note',
    url: 'https://09-auth-gamma-one.vercel.app/notes/action/create',
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
    title: 'Create note',
    description: 'Create note',
  },
};

const CreateNotePage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNotePage;
