// ─────────────────────────────────────────────────────────────────────────────
// GTMSlot — Google Tag Manager + GA4 scaffolding
//
// Setup:
//  1. Create .env.local with:
//       NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
//       NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
//       NEXT_PUBLIC_CALLRAIL_ID=12345678   ← your CallRail account ID
//
//  2. In Google Tag Manager:
//     • Create trigger: Custom Event → event name: "phone_click"
//     • Create GA4 event tag using that trigger
//     • Create Google Ads conversion tag for phone calls
//     • Publish the container
//
//  3. In GA4:
//     • Mark "phone_call" event as a conversion
//     • Set up audience: users who triggered phone_click
//
//  4. CallRail DNI (Dynamic Number Insertion):
//     • Add your CallRail swap number to the number pool
//     • CallRail script finds data-phone-target="tracking" elements
//       and replaces their text with the correct pool number
//     • Add NEXT_PUBLIC_CALLRAIL_ID to env to enable the script
// ─────────────────────────────────────────────────────────────────────────────

const GTM_ID       = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID       = process.env.NEXT_PUBLIC_GA4_ID;
const CALLRAIL_ID  = process.env.NEXT_PUBLIC_CALLRAIL_ID;

// ── GTM Head Script (load before </head>) ─────────────────────────────────────
export function GTMHeadScript() {
  if (!GTM_ID) return null;
  return (
    <script
      id="gtm-head"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  );
}

// ── GTM NoScript (place immediately after <body>) ─────────────────────────────
export function GTMNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

// ── GA4 Direct (use only if NOT using GTM) ────────────────────────────────────
export function GA4Script() {
  // Skip if GTM is active — GTM will load GA4 instead
  if (GTM_ID || !GA4_ID) return null;
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <script
        id="ga4-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA4_ID}',{
  send_page_view: true,
  cookie_flags: 'SameSite=None;Secure',
  phone_conversion_number: '${process.env.NEXT_PUBLIC_TRACKING_PHONE ?? "(864) 734-5702"}'
});`,
        }}
      />
    </>
  );
}

// ── CallRail DNI Script ───────────────────────────────────────────────────────
// Enables Dynamic Number Insertion — CallRail swaps phone numbers
// displayed on the site based on traffic source (organic vs paid).
// See: https://support.callrail.com/hc/en-us/articles/201858290
export function CallRailScript() {
  if (!CALLRAIL_ID) return null;
  return (
    <script
      async
      defer
      src={`//cdn.callrail.com/companies/${CALLRAIL_ID}/ab123456789/12/swap.js`}
      // ↑ Replace ab123456789 with your real CallRail swap.js path from
      //   CallRail dashboard → Settings → Script Builder
    />
  );
}

// ── DataLayer Init (always present — must load before GTM) ───────────────────
// Initializes the dataLayer array so GTM can push to it even if GTM loads async
export function DataLayerInit() {
  return (
    <script
      id="datalayer-init"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];`,
      }}
    />
  );
}

// ── Hidden NAP Phone (for schema/crawlers when DNI is active) ─────────────────
// When DNI replaces the visible number, search bots still need to see
// the canonical phone number for entity consistency.
// This renders a visually hidden element with the GBP number.
// Crawlers read it; users never see it.
export function HiddenNAPPhone({
  phone,
  phoneDisplay,
}: {
  phone: string;
  phoneDisplay: string;
}) {
  return (
    <span
      className="sr-only"
      itemProp="telephone"
      aria-hidden="true"
      data-nosnippet
    >
      {phoneDisplay}
      <a href={`tel:${phone}`} tabIndex={-1}>
        {phoneDisplay}
      </a>
    </span>
  );
}
