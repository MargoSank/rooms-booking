export class ResponseService {

    public static data(data: any ): string {
        const response = {
            status: "ok",
            data: data
        }
        return JSON.stringify(response);
    }

    public static error(text: string) {
        const response = {
            status: "error",
            info: text
        }
        return JSON.stringify(response);
    }

    public static validationError(text: string) {
        const response = {
            status: "validation error",
            info: text
        }
        return JSON.stringify(response);
    }
}