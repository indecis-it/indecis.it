import Script from "next/script";

export const CookieBanner = () => (
  <>
    <Script
      id="cookie-banner"
      type="text/javascript"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
        var _iub = _iub || [];
_iub.csConfiguration = {"ccpaAcknowledgeOnDisplay":true,"consentOnContinuedBrowsing":false,"cookiePolicyInOtherWindow":true,"countryDetection":true,"enableCcpa":true,"enableLgpd":true,"floatingPreferencesButtonDisplay":"bottom-right","invalidateConsentWithoutLog":true,"lgpdAppliesGlobally":false,"perPurposeConsent":true,"purposes": "1,4,5","siteId":2787116,"whitelabel":false,"cookiePolicyId":48335813,"lang":"it", "banner":{ "acceptButtonCaptionColor":"#FFFFFF","acceptButtonColor":"#0073CE","acceptButtonDisplay":true,"backgroundColor":"#FFFFFF","brandBackgroundColor":"#FFFFFF","brandTextColor":"#000000","closeButtonDisplay":false,"customizeButtonCaptionColor":"#4D4D4D","customizeButtonColor":"#DADADA","customizeButtonDisplay":true,"explicitWithdrawal":true,"fontSizeBody":"12px","listPurposes":true,"logo":"https://www.indecis.it/indecis-it-logo-diff.svg","position":"float-bottom-center","rejectButtonCaptionColor":"#FFFFFF","rejectButtonColor":"#0073CE","rejectButtonDisplay":true,"textColor":"#000000","customizeButtonCaption":"Personalizza" }};
        `,
      }}
    />
    <Script
      type="text/javascript"
      src="//cdn.iubenda.com/cs/ccpa/stub.js"
      strategy="afterInteractive"
    />
    <Script
      type="text/javascript"
      src="//cdn.iubenda.com/cs/iubenda_cs.js"
      strategy="afterInteractive"
      charSet="UTF-8"
      async
    />
  </>
);
