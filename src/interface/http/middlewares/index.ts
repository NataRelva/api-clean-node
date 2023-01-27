import { LoggingMiddleware } from './logging.middleware'
import { AuthenticationMiddleware } from './authentication.middleware'

const loggingMiddleware = new LoggingMiddleware()
const authenticationMiddleware = new AuthenticationMiddleware()

export { loggingMiddleware, authenticationMiddleware }