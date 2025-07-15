
export const authConfig = {
    clientId: 'frontend-app',
    authorizationEndpoint: 'http://localhost:9090/realms/ecommerce/protocol/openid-connect/auth',
    tokenEndpoint: 'http://localhost:9090/realms/ecommerce/protocol/openid-connect/token',
    redirectUri: 'http://localhost:3000',
    scopes: 'openid profile email offline_access',
    logoutEndpoint: 'http://localhost:9090/realms/ecommerce/protocol/openid-connect/logout',
};