import type { User } from '@/types/user';
import { nextServer } from './api';
import type { Note, NotehubResponse, TAGS } from '@/types/note';

interface Cookies {
  cookies: string;
}

const fetchNotes = async (
  { cookies }: Cookies,
  search: string,
  page: number,
  perPage: number,
  tag?: TAGS,
): Promise<NotehubResponse> => {
  const { data } = await nextServer.get<NotehubResponse>(`/notes`, {
    params: { search, page, perPage, tag },
    headers: {
      Cookie: cookies,
    },
  });

  return data;
};

const fetchNoteById = async (
  noteId: Note['id'],
  { cookies }: Cookies,
): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookies,
    },
  });

  return data;
};

const getMe = async ({ cookies }: Cookies): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookies,
    },
  });

  return data;
};

const checkSession = async ({ cookies }: Cookies): Promise<boolean> => {
  const { data } = await nextServer.get<boolean>('/auth/session', {
    headers: {
      Cookie: cookies,
    },
  });

  return data;
};

const serverNoteService = { fetchNotes, fetchNoteById, getMe, checkSession };

export default serverNoteService;
