import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  seoConfig,
  notFoundSeo,
  courseToAge,
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  type SeoConfig,
} from '@/data/seo';

const SCRIPT_ID_JSONLD = 'seo-jsonld';

const setMetaTag = (
  type: 'name' | 'property',
  key: string,
  content: string
) => {
  const selector = type === 'name' ? `meta[name="${key}"]` : `meta[property="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(type, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const setRobots = (noindex: boolean) => {
  const content = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  setMetaTag('name', 'robots', content);
};

const SeoHead = () => {
  const { pathname } = useLocation();

  const config = useMemo((): SeoConfig => {
    if (pathname in seoConfig) {
      return seoConfig[pathname];
    }
    // Неизвестный путь = 404, не индексируем
    return notFoundSeo;
  }, [pathname]);

  useEffect(() => {
    const {
      title,
      description,
      keywords,
      ogImage = DEFAULT_OG_IMAGE,
      noindex = false,
      canonical = `${SITE_URL}${pathname}`,
    } = config;

    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    const fullCanonical = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical === '/' ? '' : canonical}`;
    setCanonical(fullCanonical);

    setRobots(noindex);

    // Open Graph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', `${SITE_URL}${pathname}`);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', 'ru_RU');

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);
  }, [config, pathname]);

  // BreadcrumbList и Course schema для страниц курсов
  useEffect(() => {
    const courseMatch = pathname.match(/^\/course\/(.+)$/);
    let scriptEl = document.getElementById(SCRIPT_ID_JSONLD);

    if (courseMatch && pathname in seoConfig) {
      const courseId = courseMatch[1];
      const ageInfo = courseToAge[courseId];
      const pageSeo = seoConfig[pathname];

      const breadcrumbItems = [
        { name: 'Главная', url: SITE_URL },
        ...(ageInfo
          ? [{ name: ageInfo.title, url: `${SITE_URL}/age/${ageInfo.range}` }]
          : []),
        { name: pageSeo.title.split('|')[0].trim(), url: `${SITE_URL}${pathname}` },
      ];

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      };

      const courseSchema = {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: pageSeo.title.split('|')[0].trim(),
        description: pageSeo.description,
        provider: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        url: `${SITE_URL}${pathname}`,
      };

      const jsonLd = JSON.stringify([breadcrumbSchema, courseSchema]);

      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = SCRIPT_ID_JSONLD;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = jsonLd;
    } else {
      scriptEl?.remove();
    }
  }, [pathname]);

  return null;
};

export default SeoHead;
