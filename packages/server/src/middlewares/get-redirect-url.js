import { URL } from "url";

import { IS_PROD, APP_DOMAIN } from "../constants";

const fallbackUrl = IS_PROD ? "/" : "http://localhost:3000";

const getRedirectUrl = (req, res, next) => {
  // parse the url the request came from by getting it from referer header
  const { protocol, hostname, pathname, href } = new URL(req.get("referer"));
  const isLoggingPage = pathname === "/sign-in";

  // check if it's app domain so we can redirect ot it after logging in
  const isValidAppDomain = () => {
    const IS_APP_DOMAIN = hostname === APP_DOMAIN;
    const IS_HTTP = protocol === "https:" || protocol === "http:";
    const IS_LOCALHOST = hostname === "localhost";
    if (IS_HTTP && (IS_APP_DOMAIN || (!IS_PROD && IS_LOCALHOST))) {
      return true;
    }
    return false;
  };

  // if it is valid app domain we check if the request came from login page
  // so we can redirect to home or to original url otherwise we fallback to home
  const redirectUrl = isValidAppDomain()
    ? isLoggingPage
      ? fallbackUrl
      : href
    : fallbackUrl;

  // store the redirect url in session so we can access
  // it in the other route where we need to redirect the users
  req.session.redirectUrl = redirectUrl;
  next();
};

export default getRedirectUrl;
