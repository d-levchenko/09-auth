'use client';

import { useQuery } from '@tanstack/react-query';
import clientNoteService from '@/lib/api/clientApi';

import css from './NoteDetails.module.css';

interface NoteDetailsProps {
  id: string;
}

const NoteDetails = ({ id }: NoteDetailsProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => clientNoteService.fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Could not fetch note details. </p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.tag}>{data?.tag}</p>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
};

export default NoteDetails;
