import React, { Component } from 'react'

export default class SyncfusionBase extends React.PureComponent {
    rendereComplete() {
      /**custom render complete function */
    }
    componentDidMount() {
      setTimeout(() => {
        this.rendereComplete();
      });
    }
  }