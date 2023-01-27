export class ErrorResponse {

    constructor(
        public message: string,
        public code: number,
        public data?: any
    ) { }

    error() {
        return `Error: ${this.message} - Code: ${this.code}`
    }
}