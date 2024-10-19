import { useAccessToken, useRefreshToken } from "~/composables/useAuthData"

export default defineNuxtPlugin((nuxtApp) => {
    const accessToken = useAccessToken()
    const refreshToken = useRefreshToken()

    const api = $fetch.create({
        baseURL: '',
        onRequest({ options }) {
            if (accessToken.value)
                options.headers.set('Authorization', `Bearer ${accessToken.value}`)
        },
        async onResponseError({ response, options }) {
            if (response.status === 401) {
                try {
                    const { data } = await $fetch<any>('/auth/refresh', {
                        method: 'POST',
                        body: { token: refreshToken.value },
                    })

                    accessToken.value = data.accessToken
                    refreshToken.value = data.refreshToken

                    const retryOptions = { ...options, headers: { ...options.headers, Authorization: `Bearer ${accessToken.value}` } }
                    return await $fetch(retryOptions.baseURL!, retryOptions as any)
                } catch (error) {
                    await nuxtApp.runWithContext(() => navigateTo('/login'))
                }
            }
        }
    })

    return {
        provide: { api }
    }
})
