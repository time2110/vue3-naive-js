// 解决无法获取变量import.meta.env.*
export function wrapperEnv(envOptions) {
    if(!envOptions) return {}
    const env = {}
    Reflect.ownKeys(envOptions).forEach((key) => {
        let value = envOptions[key]
        if(key === 'VITE_PROXY' && value) {
            try {
                value = JSON.parse(value.replace(/'/g, '"'))
            } catch (error) {
            value = ''
            }
        }
        env[key] = value
        switch(typeof key) {
            case 'string':
                process.env[key] = value
                break;
            case 'object':
                process.env[key] = JSON.stringify(value)
        }
    })
    return env
}
// 创建代理
const httpsReg = /^https:\/\//;
export function createProxy(proxyArr = []) {
    const result = {}
    proxyArr = proxyArr || []
    proxyArr.forEach(([prefix, target], value) => {
        const isHttps = httpsReg.test(target)
        result[prefix] = {
            target,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
            ...(isHttps ? { secure: false } : {}),
        }
    })
    return result
}     