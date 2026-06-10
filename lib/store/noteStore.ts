import { TAGS } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NoteFormValues {
  title: string;
  content: string;
  tag: TAGS;
}

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: NoteFormValues;
  setDraft: (draft: NoteFormValues) => void;
  clearDraft: () => void;
};

const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialValues,
      setDraft: (draft: NoteFormValues) => set({ draft }),
      clearDraft: () => set({ draft: initialValues }),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    },
  ),
);

export default useNoteDraftStore;
