import { APIRequestContext, request, expect } from "@playwright/test";

export class APIUtils {
    readonly request : APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getProfileDetails(token: string) {
        const response = await this.request.get(`${process.env.BASE_URL}/api/profile`,
            {
                headers: {
                    'accept': '*/*',
                    'cookie': `token=${token}`
                }
            }
        );
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log('Profile API response: ', responseBody);
        return responseBody;
    }

}