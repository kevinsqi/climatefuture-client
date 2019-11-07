import React from 'react';

import Flooding from './Flooding';
import Methodology from './Methodology';
import Precipitation from './Precipitation';
import Sidebar from './Sidebar';
import Temperature from './Temperature';

export default function LocationPage({ geo, results, query }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-12 col-md-4 col-xl-3 bg-cream min-height-100vh-md"
          style={{ position: 'sticky' }}
        >
          <Sidebar geo={geo} query={query} />
        </div>
        <div className="col-12 col-md-8 col-xl-9">
          <div className="px-3 px-md-4 py-4">
            <Temperature results={results} />
            <div style={{ marginTop: 60 }}>
              <Flooding results={results} />
            </div>
            <div style={{ marginTop: 60 }}>
              <Precipitation results={results} />
            </div>
            <div style={{ marginTop: 60 }}>
              <hr />
            </div>
            <Methodology className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
