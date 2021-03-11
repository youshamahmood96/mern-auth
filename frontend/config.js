import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export const API = publicRuntimeConfig.PRODUCTION ? 'https://youshablog.com' : 'http://localhost:8000/api';
export const appName = publicRuntimeConfig.APP_NAME