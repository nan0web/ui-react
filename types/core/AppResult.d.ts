declare type AppResult = {
  content: any[]; // Extended from core string[] to any[] for flexibility
  actions?: Record<string, Function>;
  requiresInput?: boolean;
  compute?: Function | null;
  Renderer?: Function | null;
  data?: any;
  t?: Function;
  $title?: string;
  message?: string;
  updatedContent?: any[];
  error?: string;
};