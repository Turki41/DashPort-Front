export const API_PATHS = {
    AUTH: {
        CHECK_AUTH: 'auth/check-auth',
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        LOGOUT: '/auth/logout'
    },
    HERO: {
        GET_HERO: '/hero/',
        EDIT_HERO: (heroId: string) => `/hero/${heroId}`
    },
    TECH: {
        GET_TECH: '/technology/',
        ADD_TECH: '/technology/',
        DELETE_TECH: (techId: string) => `/technology/${techId}`,
        EDIT_TECH: (techId: string) => `/technology/${techId}`
    },
    PROJECTS: {
        GET_PROJECTS: '/projects/',
        ADD_PROJECT: '/projects/',
        EDIT_PROJECT: (projectId: string) => `/projects/${projectId}`,
        DELETE_PROJECT: (projectId: string) => `/projects/${projectId}`
    },
    CERTIFICATES: {
        GET_CERTS: '/certificate/',
        ADD_CERTS: '/certificate/',
        EDIT_CERT: (certId: string) => `/certificate/${certId}`,
        DELETE_CERT: (certId: string) => `/certificate/${certId}`
    }
}