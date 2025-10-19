import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "uBlacklist",
  tagline:
    "Block the sites you specify from appearing in Google search results",
  favicon: "img/icon.svg",

  url: "https://ublacklist.github.io",
  baseUrl: "/",
  trailingSlash: false,

  organizationName: "ublacklist",
  projectName: "ublacklist",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja", "pt-BR", "de"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          editUrl: "https://github.com/ublacklist/website/edit/main/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "uBlacklist",
      logo: {
        alt: "uBlacklist",
        src: "img/icon.svg",
      },
      items: [
        {
          to: "docs",
          label: "docs",
        },
        {
          to: "subscriptions",
          label: "subscriptions",
        },
        {
          to: "privacy-policy",
          label: "privacyPolicy",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        // https://github.com/facebook/docusaurus/issues/2634#issuecomment-1159596930
        {
          href: "https://github.com/iorate/ublacklist",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
      hideOnScroll: true,
    },
    footer: {
      style: "dark",
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    tableOfContents: {
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,

  future: {
    experimental_faster: true,
    v4: true,
  },
};

export default config;
