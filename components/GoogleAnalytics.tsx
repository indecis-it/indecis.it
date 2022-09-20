import { getCookie } from "cookies-next";
import Script from "next/script";
import { useEffect, useState } from "react";
import { COOKIE_KEY } from "../global/constants";

export const GoogleAnalytics = () => {
  const [consent, setConsent] = useState(false);
  const cookie = getCookie(COOKIE_KEY) as string;
  useEffect(() => {
    if (cookie) {
      const {
        purposes: { measurement },
      } = JSON.parse(decodeURI(cookie));
      setConsent(measurement);
    }
  }, [cookie]);

  return consent ? (
    <>
      <Script
        id="ga-data-layer-prep"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("consent", "default", {
            ad_storage: "denied",
            analytics_storage: "denied",
            functionality_storage: "denied", // optional
            personalization_storage: "denied", // optional
            security_storage: "denied", // optional
            wait_for_update: 2000 // milliseconds
          });
          gtag('set', 'url_passthrough', true);
          gtag("set", "ads_data_redaction", true);
          `,
        }}
      />
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

