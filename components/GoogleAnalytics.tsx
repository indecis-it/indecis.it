import Script from "next/script";

export const GoogleAnalytics = () => (
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
);
