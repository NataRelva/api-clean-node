import { FastifyReply, FastifyRequest } from "fastify";

export interface Middleware {
    handle(req: FastifyRequest, res: FastifyReply, next: (err?: Error) => void): void
}