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

  interface Agent {
    code: string;
    alias: string;
    status: string;
    art: JsonImage[];
    label?: string;
  }

  interface Mission {
    code: string;
    status: string;
    brief: string;
    label?: string;
  }

  interface JsonImage {
    path: string;
    credits: string[][];
    dimensions: {
      width: number,
      height: number,
    }
  }
}
