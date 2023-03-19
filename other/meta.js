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
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Nukes n' shit",
  keywords: 'USSR, abandoned, bunker, dosimeter, gasmask, restoration, nuclear, radioactive',
  description:
    "We are committed to preserving and restoring historical artifacts through expert restoration work, acquisition and sales of antiques, and documentation of historically significant locations. Our goal is to ensure that the past is preserved for future generations and made accessible to all.",
  topic: "Preserving the past",
  type: "website"
};

export default Meta;