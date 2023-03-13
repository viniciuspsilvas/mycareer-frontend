import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig

export interface Environment {
  NEXT_PUBLIC_API_URL: string
  // JWT: {
  //   SECRET: string
  //   SUBJECT: string
  // }
}

export const getEnv = (): Environment => {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

  const env = {
    NEXT_PUBLIC_API_URL: publicRuntimeConfig?.NEXT_PUBLIC_API_URL
    // JWT: { SECRET: serverRuntimeConfig?.JWT_SECRET, SUBJECT: serverRuntimeConfig?.JWT_SUBJECT }
  }
  return env
}
