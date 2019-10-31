import NextHead from 'next/head';

function Head({ title }) {
  return (
    <NextHead>
      <title>ClimateFuture | Climate change projections for your location</title>
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
      <link rel="stylesheet" href="/styles.css" />
    </NextHead>
  );
}
export default Head;
