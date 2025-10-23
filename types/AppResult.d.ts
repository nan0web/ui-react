declare type AppResult = {
  content: string[];
  priority?: number;
  meta?: object;
  error?: Error | null;
  actions?: Record<string, Function>;
  requiresInput?: boolean;
  compute?: Function | null;
  Renderer?: Function | null;
  data?: any;
  t?: Function;
  $title?: string;
  message?: string;
  updatedContent?: any[];
};