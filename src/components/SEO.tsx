import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Buzzy Conversions - Free Online File Converter & Tools',
  description = 'Convert files online for free! PDF to Word, JPG to PNG, and more. Fast, secure, and high-quality file conversion tools. No installation required.',
  keywords = 'file converter, pdf converter, image converter, online converter, pdf to word, jpg to png, free converter, document converter',
  image = '/og-image.png',
  url = 'https://buzzyconversions.com',
  type = 'website'
}) => {
  const siteTitle = title.includes('Buzzy Conversions') ? title : `${title} | Buzzy Conversions`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO; 