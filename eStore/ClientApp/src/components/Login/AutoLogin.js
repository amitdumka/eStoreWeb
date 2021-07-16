import React from 'react'
import { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { AuthenticationResultStatus } from './api-authorization/AuthorizeService';
import { QueryParameterNames } from './api-authorization/ApiAuthorizationConstants';

export default class AutoLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: undefined
        };
    }

    componentDidMount() {

        this.login(this.getReturnUrl());
    }
    redirectToApiAuthorizationPath(apiAuthorizationPath) {
        const redirectUrl = `${window.location.origin}/${apiAuthorizationPath}`;
        // It's important that we do a replace here so that when the user hits the back arrow on the
        // browser they get sent back to where it was on the app instead of to an endpoint on this
        // component.
        window.location.replace(redirectUrl);
    }

    navigateToReturnUrl(returnUrl) {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        window.location.replace(returnUrl);
    }
    async login(returnUrl) {
        const state = { returnUrl };
        const result = await authService.signIn(state);
        switch (result.status) {
            case AuthenticationResultStatus.Redirect:
                break;
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl(returnUrl);
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error(`Invalid status result ${result.status}.`);
        }
    }
    getReturnUrl(state) {
        const params = new URLSearchParams(window.location.search);
        const fromQuery = params.get(QueryParameterNames.ReturnUrl);
        if (fromQuery && !fromQuery.startsWith(`${window.location.origin}/`)) {
            // This is an extra check to prevent open redirects.
            throw new Error("Invalid return url. The return url needs to have the same origin as the current page.")
        }
        return (state && state.returnUrl) || fromQuery || `${window.location.origin}/`;
    }

}