import http from "../config"

export const auth = {
    signIn: (data) => http.post('/auth/login', data),
    signUp: (data) => http.post('/auth/register', data),
    auth_verify: (data) => http.post('/auth/verify', data),
}