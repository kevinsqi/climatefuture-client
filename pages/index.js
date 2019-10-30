import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav';

function Home() {
  const [address, setAddress] = React.useState('');

  function onSubmit(event) {
    event.preventDefault();
    // TODO: better string cleansing?
    window.location = `/location/${address.replace(' ', '-')}`;
  }

  return (
    <div>
      <Head>
        <title>ClimateFuture | Climate change projections for your location</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <div className="container">
        <div className="height-100vh d-flex flex-column justify-content-center align-items-center">
          <h1>ClimateFuture</h1>

          <form onSubmit={onSubmit}>
            <input
              className="form-control"
              type="text"
              value={address}
              placeholder="City, address, or zip"
              onChange={(event) => setAddress(event.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
