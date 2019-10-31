import React from 'react';
import Head from '../components/Head';

function Home() {
  const [address, setAddress] = React.useState('');

  function onSubmit(event) {
    event.preventDefault();
    // TODO: better string cleansing?
    window.location = `/location/${address.replace(' ', '-')}`;
  }

  return (
    <div className="bg-cream">
      <Head title="ClimateFuture | Climate change projections for your location" />
      <div className="height-100vh d-flex flex-column">
        <div className="flex-1 d-flex flex-column justify-content-center align-items-center">
          <div className="container">
            <div className="text-center">
              <div className="h1">🔥</div>
              <h1 className="d-inline-block h2 font-weight-bold">ClimateFuture</h1>
              <sup className="superscript">Alpha</sup>
              <p>See the projected impacts of climate change for where you live.</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3">
                <form className="mt-4" onSubmit={onSubmit}>
                  <input
                    className="form-control form-control-lg text-center"
                    type="text"
                    value={address}
                    placeholder="City, address, or zip"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </form>

                <p className="mt-2 text-center text-secondary small">
                  Data is sparse right now&mdash;the richest data is in{' '}
                  <a href="/location/san-francisco">san francisco</a>,{' '}
                  <a href="/location/dallas">dallas</a>, and{' '}
                  <a href="/location/new-york">new york</a>.
                </p>
              </div>
              <div style={{ paddingBottom: 200 }} />
            </div>
          </div>
        </div>
        <footer className="container pb-5">
          <div className="text-center">
            <a href="/about">About</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
