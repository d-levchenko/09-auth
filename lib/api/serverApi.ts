import type { User } from '@/types/user';
import { nextServer } from './api';
import type { Note, NotehubResponse, TAGS } from '@/types/note';
import { cookies } from 'next/headers';

const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag?: TAGS,
): Promise<NotehubResponse> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<NotehubResponse>(`/notes`, {
    params: { search, page, perPage, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

const checkSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get<boolean>('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

const serverNoteService = { fetchNotes, fetchNoteById, getMe, checkSession };

export default serverNoteService;
