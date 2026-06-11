export type TAGS = 'Work' | 'Personal' | 'Todo' | 'Shopping' | 'Meeting';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NotehubResponse {
  notes: Note[];
  totalPages: number;
}
