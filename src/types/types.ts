export interface DreamLog {
  code: string;
  timestamp: string;
  text: string;
  label?: string;
}

export interface Agent {
  code: string;
  alias: string;
  status: string;
  roles: string[];
  socials: Array<JsonSocial>;
  art: JsonImage[];
  label?: string;
}

export interface Mission {
  code: string;
  status: string;
  brief: string;
  url?: string;
  label?: string;
}

export interface JsonImage {
  path: string;
  credits: string[][];
  dimensions: {
    width: number,
    height: number,
  }
}

export interface JsonSocial {
  platform: 'x' | 'yt';
  handle: string;
}
