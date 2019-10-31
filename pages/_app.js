import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default withGA(process.env.GOOGLE_ANALYTICS_TRACKING_ID, Router)(CustomApp);
