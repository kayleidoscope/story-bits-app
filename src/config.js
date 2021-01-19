const isDev = process.env.NODE_ENV !== 'production'

const config = {
    API_ENDPOINT: isDev ? `http://localhost:8000/` : `https://arcane-beyond-38015.herokuapp.com/`,
    CURRENT_VERSION: 2
}

export default config