import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import serverNoteService from '@/lib/api/serverApi';
import NoteDetails from './NoteDetails.client';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: NoteDetailsProps): Promise<Metadata> => {
  const { id } = await params;

  const { title, content } = await serverNoteService.fetchNoteById(id);

  return {
    title: `Note ${title}`,
    description: `Note ${content} details`,

    openGraph: {
      title: `Note ${title}`,
      description: `Note ${content} details`,
      url: `https://09-auth-gamma-one.vercel.app/notes/${id}`,
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
      title: `Note ${title}`,
      description: `Note ${content} details`,
    },
  };
};

const NotePageDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();

  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['notes', id],
    queryFn: () => serverNoteService.fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
};

export default NotePageDetails;
