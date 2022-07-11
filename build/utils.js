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