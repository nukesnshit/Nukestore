import Head from "next/head";

const Meta = ({ title, keywords, description, topic, type }) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="page-topic" content={topic} />
      <meta name="page-type" content={type} />
      <meta rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="msapplication-TileColor" content="#5000ff" />
      <meta name="theme-color" content="#5000ff" />

      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Nukes n' shit",
  keywords: ['dosimeter', 'gasmask', 'bunker', 'abandoned', 'restoration', 'nuclear', 'abandoned'],
  description:
    "We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques, and documentation of historically significant locations. Our goal is to ensure that the past is preserved for future generations and made accessible to all.",
  topic: "USSR",
  type: "website"
  };

export default Meta;