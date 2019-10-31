import React from 'react';
import classNames from 'classnames';

function Sidebar({ geo, query }) {
  const [address, setAddress] = React.useState(query.address);

  function onSubmit(event) {
    event.preventDefault();
    // TODO: better string cleansing?
    window.location = `/location/${address.replace(' ', '-')}`;
  }

  return (
    <div className="d-flex flex-column px-3 py-4" style={{ height: '100%' }}>
      <div style={{ flex: 1 }}>
        <div>
          <a href="/" className="no-underline text-secondary style-uppercase">
            🔥 ClimateFuture
          </a>
        </div>
        <form className="mt-2" onSubmit={onSubmit}>
          <input
            className="form-control"
            type="text"
            value={address}
            placeholder="City, address, or zip"
            onChange={(event) => setAddress(event.target.value)}
          />
        </form>
        <h2 className="h4 font-weight-bold mt-3">{geo.formatted_address}</h2>
        <hr />
        <div className="text-secondary style-uppercase">Projections for</div>
        <div className="mt-3">
          {[2040, 2060, 2080, 2099].map((year) => {
            const isCurrentYear = Number(query.year) === year;
            return (
              <div className="d-inline-block d-md-block pr-4 mt-2">
                <a
                  className={classNames('NavLink no-underline h4 font-weight-normal', {
                    'NavLink--active': isCurrentYear,
                  })}
                  href={`/location/${query.address}?year=${year}`}
                  key={year}
                >
                  {year}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
