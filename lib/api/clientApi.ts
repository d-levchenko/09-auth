import { nextServer } from './api';
import type { NotehubResponse, Note, TAGS } from '@/types/note';
import type { User } from '@/types/user';

interface RegisterRequest {
  email: string;
  password: string;
  userName: string;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

const fetchNotes = async (
  search: string,
  page: number,
  perPage: number,
  tag?: TAGS,
): Promise<NotehubResponse> => {
  const { data } = await nextServer.get<NotehubResponse>('/notes', {
    params: { search, page, perPage, tag },
  });

  return data;
};

const fetchNoteById = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);

  return data;
};

const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteProps): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', {
    title,
    content,
    tag,
  });

  return data;
};

const deleteNote = async (noteId: Note['id']): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);

  return data;
};

const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

const login = async (email: string, password: string): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/login', {
    email,
    password,
  });

  return data;
};

const logout = async (): Promise<User> => {
  const { data } = await nextServer.post<User>('/auth/logout', null);

  return data;
};

const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<boolean>('/auth/session');

  return data;
};

const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me');

  return data;
};
const updateMe = async (user: User): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', user);

  return data;
};

const clientNoteService = {
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
  register,
  login,
  logout,
  checkSession,
  getMe,
  updateMe,
};

export default clientNoteService;
