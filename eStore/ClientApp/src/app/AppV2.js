import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
//Okta Addition
import { Security } from '@okta/okta-react';
import config from '../config';

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AppV2 extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
