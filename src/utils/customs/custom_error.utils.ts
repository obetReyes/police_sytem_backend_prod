export class CustomError extends Error {
    statusCode: number | undefined;
    campo: string;
    href: string;
    constructor(campo: string, message: string, href: string, statusCode?: number) {
        super(message);
        this.campo = campo;
        this.statusCode = statusCode;
        this.href = href;
    }
}

