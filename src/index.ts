import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { auth } from './domain/usecases/securityUseCases';
import { AuthRoutes } from './interface/http/routers/auth';

const fastify = Fastify({ logger: true });

// Declaração de rotas
AuthRoutes(auth,fastify);

fastify.register(require('@fastify/cors') , {     
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});


fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {});

const port = Number(process.env.PORT || 3000);

const start = async () => {
    try {
        fastify.listen({ port });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();