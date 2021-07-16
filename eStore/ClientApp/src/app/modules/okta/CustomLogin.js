import {
    OktaAuth,
    OktaAuthOptions,
    TokenManager,
    AccessToken,
    IDToken,
    UserClaims,
    TokenParams
  } from '@okta/okta-auth-js'
  
//   const config: OktaAuthOptions = {
//     issuer: 'https://dev-63318095.okta.com/oauth2/defaultoauth2/default',
//     clientId:'0oacfqtylAFNYrEex5d6',
//     scopes: ['openid', 'profile', 'email'],
//     pkce: true,
//   }
  
//   const authClient: OktaAuth = new OktaAuth(config)
//   const tokenManager: TokenManager = authClient.tokenManager;
//   const accessToken: AccessToken = await tokenManager.get('accessToken') as AccessToken;
//   const idToken: IDToken = await tokenManager.get('idToken') as IDToken;
//   const userInfo: UserClaims = await authClient.getUserInfo(accessToken, idToken);
  
//   if (!userInfo) {
//     const tokenParams: TokenParams = {
//       scopes: ['openid', 'email', 'custom_scope'],
//     }
//     authClient.token.getWithRedirect(tokenParams);
//   }

const CustomLoginWidget= ({ config, onSuccess, onError }) => {

const authClient = new OktaAuth(/* configOptions */);
};
export default CustomLoginWidget;
