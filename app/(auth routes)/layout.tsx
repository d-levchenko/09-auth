'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
};

export default PublicLayout;
