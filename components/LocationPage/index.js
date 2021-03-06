import React from 'react';

import Flooding from './Flooding';
import Methodology from './Methodology';
import Precipitation from './Precipitation';
import Sidebar from './Sidebar';
import Temperature from './Temperature';

export default function LocationPage({ geo, results, query }) {
  // Transform results from an array to an object
  const resultsObj = results.reduce((obj, result) => {
    obj[result.attribute] = result;
    return obj;
  }, {});

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
            {Object.keys(resultsObj).length > 0 ? (
              <React.Fragment>
                <Temperature results={resultsObj} />
                <div style={{ marginTop: 60 }}>
                  <Flooding results={resultsObj} />
                </div>
                <div style={{ marginTop: 60 }}>
                  <Precipitation results={resultsObj} />
                </div>
              </React.Fragment>
            ) : (
              <div>
                <div className="h4 font-weight-bold">
                  Sorry, we don't have data available yet for "{query.address}".
                </div>
                <p>
                  Our data is currently most comprehensive in the United States, but we plan to
                  improve our data coverage worldwide.
                </p>
              </div>
            )}
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
