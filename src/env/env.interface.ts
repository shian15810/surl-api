export interface Env {
  readonly NODE_ENV: 'development' | 'test' | 'production';
  readonly PORT: number;
}
