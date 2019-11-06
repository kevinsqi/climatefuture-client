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
              <sup className="superscript">Beta</sup>
              <p>See the projected impacts of climate change for where you live.</p>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 offset-md-3">
                <form className="mt-4" onSubmit={onSubmit}>
                  <input
                    className="form-control form-control-lg text-center"
                    autoFocus
                    type="text"
                    value={address}
                    placeholder="Your city or zipcode"
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </form>

                <p className="mt-3 text-center text-secondary small">
                  Try <a href="/location/new-york-ny">new york</a>,{' '}
                  <a href="/location/los-angeles">los angeles</a>, or{' '}
                  <a href="/location/02111">02111</a>
                </p>
              </div>
              <div style={{ paddingBottom: 200 }} />
            </div>
          </div>
        </div>
        <footer className="container pb-5">
          <div className="text-center">
            <a href="/about">About</a>
            <a className="ml-3" href="https://github.com/kevinsqi/climatefuture">
              Github
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
