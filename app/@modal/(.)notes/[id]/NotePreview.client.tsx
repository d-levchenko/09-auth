'use client';

import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import clientNoteService from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface NotePreviewModalProps {
  id: string;
}

const NotePreviewClient = ({ id }: NotePreviewModalProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => clientNoteService.fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) return <div>Loading...</div>;

  if (error || !note) return <div>Something went wrong.</div>;

  return (
    <Modal onClose={handleClose}>
      <NotePreview note={note} />
    </Modal>
  );
};

export default NotePreviewClient;
