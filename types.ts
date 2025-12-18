
export interface AnalysisResult {
  critique: string;
  prompts: string[];
}

export interface Variation {
  url: string;
  style: string;
}

export type AppState = 'idle' | 'analyzing' | 'developing' | 'completed';
