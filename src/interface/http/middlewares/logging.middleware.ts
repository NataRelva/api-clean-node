import { FastifyReply, FastifyRequest } from "fastify"
import { Middleware } from "./interfaces/imiddleware"

export class LoggingMiddleware implements Middleware {
    handle(req: FastifyRequest, res: FastifyReply, next: (err?: Error) => void): void {
      console.log(`Received request to ${req.url}`)
      next()
    }
}