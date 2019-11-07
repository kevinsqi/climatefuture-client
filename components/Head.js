import NextHead from 'next/head';

function Head({ title }) {
  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="/styles.css" />
    </NextHead>
  );
}
export default Head;
