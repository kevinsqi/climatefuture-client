import React from 'react';
import classNames from 'classnames';
import queryString from 'query-string';

function getStaticMapURL(geo) {
  const { lat, lng } = geo.geometry.location;
  const query = {
    center: `${lat},${lng}`,
    zoom: 5,
    // key: ... use env var
    size: '500x200',
    style: [
      `feature:administrative|element:labels|visibility:off`,
      `feature:landscape|element:all|visibility:simplified|lightness:0|color:0xf7f6f3`,
      `feature:poi|element:all|visibility:simplified|saturation:-100|lightness:30`,
      `feature:poi|element:labels|visibility:off`,
      `feature:road|element:all|visibility:off`,
      `feature:transit|element:all|visibility:off`,
      `feature:water|element:labels|visibility:off`,
      `feature:water|element:geometry|saturation:-100|lightness:-20`,
    ],
  };

  return `https://maps.googleapis.com/maps/api/staticmap?${queryString.stringify(query)}`;
}

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
              <div className="d-inline-block d-md-block pr-4 mt-2" key={year}>
                <a
                  className={classNames('NavLink no-underline h4 font-weight-normal', {
                    'NavLink--active': isCurrentYear,
                  })}
                  href={`/location/${query.address}?year=${year}`}
                >
                  {year}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pt-4">
        <img
          className="width-full rounded border"
          alt={`map of ${geo.formatted_address}`}
          src={getStaticMapURL(geo)}
        />
      </div>
    </div>
  );
}

export default Sidebar;
