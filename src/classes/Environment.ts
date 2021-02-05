export default class Environment {
  static readonly isDevelopment = process.env.NODE_ENV !== 'production';
}
