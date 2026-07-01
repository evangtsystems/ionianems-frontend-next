import Head from 'next/head';

const Meta = ({ title, description, keywords, canonical }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'IONIANEMS – Marine Electrical Solutions in Corfu',
  description:
    'Marine electrical experts based in Corfu, offering diagnostics, installations, and upgrades for yachts and boats. Fast, reliable service across the Ionian.',
  keywords:
    'marine electrical Corfu, yacht electrician Greece, boat wiring Ionian, marine electronics Corfu, battery chargers, navigation systems',
  canonical: 'https://www.ionianems.com/',
};

export default Meta;

