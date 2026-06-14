import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import serverNoteService from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

import type { TAGS } from '@/types/note';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: FilterPageProps): Promise<Metadata> => {
  const { slug } = await params;

  return {
    title: slug[0] === 'all' ? 'All Notes' : `${slug[0]} notes`,
    description:
      slug[0] === 'all' ? 'List of all notes' : `List of ${slug[0]} notes`,

    openGraph: {
      title: slug[0] === 'all' ? 'All Notes' : `${slug[0]} notes`,
      description:
        slug[0] === 'all' ? 'List of all notes' : `List of ${slug[0]} notes`,
    },

    twitter: {
      title: slug[0] === 'all' ? 'All Notes' : `${slug[0]} notes`,
      description:
        slug[0] === 'all' ? 'List of all notes' : `List of ${slug[0]} notes`,
    },
  };
};

const FilterPage = async ({ params }: FilterPageProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const selectedTag = slug[0] as TAGS;

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, perPage: 12, tag: selectedTag }],
    queryFn: () => serverNoteService.fetchNotes('', 1, 12, selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {slug[0] === 'all' ? (
        <NotesClient tag={undefined} />
      ) : (
        <NotesClient tag={selectedTag} />
      )}
    </HydrationBoundary>
  );
};

export default FilterPage;
