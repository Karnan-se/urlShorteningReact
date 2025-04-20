let environment = (import.meta.env.VITE_ENVIRONMENT) ?? "production"

export const configKeys = {
    BaseUrl : environment == "development" ? "http://localhost:3000" : "https://urlshort.vingle.shop"
}