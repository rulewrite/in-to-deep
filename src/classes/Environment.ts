export default class Environment {
  static readonly IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
}
