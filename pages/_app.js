// import App from "next/app";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import withRedux from "next-redux-wrapper";
import dynamic from "next/dynamic";
import store from "../redux/store.js";
import { SnackbarProvider } from "notistack";
import "semantic-ui-css/semantic.min.css";
import Head from "next/head";
import Router from "next/router";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import NProgress from "nprogress";
const NavigationItem = dynamic(
  async () => {
    return import("../components/Navigation/NavigationItem/NavigationItem");
  },
  { ssr: false }
);
const Notification = dynamic(
  async () => {
    return import("../components/Notiications/Notifications");
  },
  { ssr: false }
);
Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};
const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  // static async getInitialProps({ Component, ctx }) {
  //   const pageProps = Component.getInitialProps
  //     ? await Component.getInitialProps(ctx)
  //     : {};

  //   //Anything returned here can be accessed by the client
  //   return { pageProps: pageProps };
  // }

  // render() {
  //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
  // const { Component, pageProps } = this.props;

  return (
    <Provider store={store}>
      <SnackbarProvider max={4}>
        <NavigationItem />
        <Notification />
        <div style={{ width: "100%", maxWidth: "1444px", margin: "auto" }}>
          <Component {...pageProps} />
        </div>
      </SnackbarProvider>
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </Provider>
  );
};
// }

//makeStore function that returns a new store for every request
// const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
export default App;
