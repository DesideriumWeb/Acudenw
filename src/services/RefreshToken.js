export class RefreshToken {
    static get() {
        if (typeof window === "undefined") {
            return null
        }

        return localStorage.getItem('refreshToken') || null
    }

    static set(token) {
        if(typeof window === "undefined") {
            return null
        }

        localStorage.setItem('refreshToken', token || '')
    }

    static clear() {
        if(typeof window === "undefined") {
            return null
        }

        localStorage.removeItem('refreshToken')
    }
}
