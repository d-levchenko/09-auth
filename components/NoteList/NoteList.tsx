'use client';

import css from './NoteList.module.css';
import type { Note } from '@/types/note';
import clientNoteService from '@/lib/api/clientApi';

import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import NoteItem from '../NoteItem/NoteItem';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: clientNoteService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: Note['id']) => {
    mutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <NoteItem
          key={note.id}
          note={note}
          handleDelete={handleDelete}
          mutation={mutation}
        />
      ))}
    </ul>
  );
};

export default NoteList;
