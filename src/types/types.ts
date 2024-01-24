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
  art: JsonImage[];
  label?: string;
}

export interface Mission {
  code: string;
  status: string;
  brief: string;
  embed: string;
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
