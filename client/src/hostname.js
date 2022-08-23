require('dotenv').config()
let hostname = process.env.REACT_APP_HOSTNAME === "" ? process.env.REACT_APP_HOSTNAME_DEV : process.env.REACT_APP_HOSTNAME
let hostURL = process.env.REACT_APP_HOSTURL === "" ? process.env.REACT_APP_HOSTURL_DEV : process.env.REACT_APP_HOSTURL



export { hostname, hostURL }
