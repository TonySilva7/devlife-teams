type IAppErrorMessage = {
  message: string
}
class AppError extends Error {
  constructor({ message }: IAppErrorMessage) {
    super(message)
    this.name = 'AppError'
  }
}

export { AppError }
