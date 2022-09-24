import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_KEY } from "../global/constants";
import { getCookie } from "cookies-next";
import { cookieDecode } from "../global/utils";

export const GoogleAnalytics = () => {
  const [consent, setConsent] = useState(false);
  const cookie = getCookie(COOKIE_KEY) as string;
  useEffect(() => {
    if (cookie) {
      const {
        purposes: { measurement },
      } = cookieDecode(cookie);
      setConsent(measurement);
    }
  }, [cookie]);

  return consent ? (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-WKG4HP07MS"
      />
      <Script
        id="ga-setup"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date()); gtag('config', 'G-WKG4HP07MS');
          `,
        }}
      />
    </>
  ) : null;
};

