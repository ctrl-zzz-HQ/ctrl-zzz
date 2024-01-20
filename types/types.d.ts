import { ReactNode } from 'react';

declare global {
  interface LayoutProps {
    children: ReactNode;
  }

  interface DreamLog {
    code: string;
    timestamp: string;
    url: string;
    label?: string;
  }
}
