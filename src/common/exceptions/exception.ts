export class Exception extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }

  static new(statusCode: number, message: string) {
    return new Exception(statusCode, message);
  }
}
