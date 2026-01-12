interface Env {
    SECRET_API_KEY: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    // Access environment variables securely
    const apiKey = context.env.SECRET_API_KEY;

    // Example: Return the key presence (DO NOT return the actual key in production!)
    // In a real scenario, you would use 'apiKey' to fetch from OpenAI or another service.

    const responseData = {
        message: "Hello from Cloudflare Functions!",
        hasKey: !!apiKey, // true if key exists
        timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(responseData), {
        headers: {
            "Content-Type": "application/json"
        }
    });
};
