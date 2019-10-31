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
    <div>
      <Head title="ClimateFuture | Climate change projections for your location" />
      <div className="height-100vh d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <div className="text-center">
            <div className="h1">🔥</div>
            <h1 className="h2 font-weight-bold">ClimateFuture</h1>
            <p>Climate change projections for where you live.</p>
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
            </div>
          </div>
          <div style={{ paddingBottom: 100 }} />
        </div>
      </div>
    </div>
  );
}

export default Home;
