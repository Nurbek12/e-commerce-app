export const useAccessToken = () => {
    return useCookie<string|null>('accessToken', {
        default: () => null,
        expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
        httpOnly: true
    })
}

export const useRefreshToken = () => {
    return useCookie<string|null>('refreshToken', {
        default: () => null
    })
}

export const useUserData = () => {
    return useCookie<any|null>('userData', {
        default: () => null
    })
}