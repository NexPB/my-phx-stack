// Inertia v3 ships its own XHR client (no more axios). We attach Phoenix's
// CSRF token via the client's request interceptor so every non-GET Inertia
// visit passes protect_from_forgery.
import { http } from '@inertiajs/react'

export function installHttpHeaderInterceptor(): void {
  http.onRequest((config) => {
    const csrfToken = document
      .querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
      ?.content

    if (csrfToken) {
      config.headers = config.headers ?? {}
      config.headers['x-csrf-token'] = csrfToken
    }

    return config
  })
}
