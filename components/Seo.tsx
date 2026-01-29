import Head from "next/head";
import { useRouter } from "next/router";
import basics from "@/data/basics.json";

type SeoProps = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "video" | "video.other";
  twitterCard?: "summary" | "summary_large_image";
  canonical?: string;
  ogVideo?: string;
};

const toAbsoluteUrl = (url: string, siteUrl: string) => {
  if (!url) return siteUrl;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${siteUrl}${url}`;
  return `${siteUrl}/${url}`;
};

const getSiteUrl = () => {
  const website = basics.website || "";
  if (website.startsWith("http://") || website.startsWith("https://")) {
    return website.replace(/\/$/, "");
  }
  return `https://${website.replace(/\/$/, "")}`;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  image = "/images/allen-flux-hacker.jpg",
  type = "website",
  twitterCard = "summary_large_image",
  canonical,
  ogVideo,
}) => {
  const router = useRouter();
  const siteUrl = getSiteUrl();
  const canonicalUrl =
    canonical || `${siteUrl}${router.asPath.split("?")[0].split("#")[0]}`;
  const ogImage = toAbsoluteUrl(image, siteUrl);
  const ogVideoUrl = ogVideo ? toAbsoluteUrl(ogVideo, siteUrl) : undefined;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={title} key="og:title" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta property="og:image" content={ogImage} key="og:image" />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:site_name" content={basics.name} key="og:site_name" />
      {ogVideoUrl ? (
        <meta property="og:video" content={ogVideoUrl} key="og:video" />
      ) : null}
      <meta name="twitter:card" content={twitterCard} key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />
      <meta name="twitter:image" content={ogImage} key="twitter:image" />
      <link rel="canonical" href={canonicalUrl} key="canonical" />
    </Head>
  );
};

export default Seo;
