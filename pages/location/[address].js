import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';

import Head from '../../components/Head';
import Sidebar from '../../components/Sidebar';
import {
  FloodingSection,
  Methodology,
  PrecipitationSection,
  SCENARIOS,
  Temperature,
  TemperatureSection,
} from '../../components/LocationPage';

const DEFAULT_YEAR = 2080;

export default function Location({ geo, results, query }) {
  return (
    <div>
      <Head title={`${geo.formatted_address} | ClimateFuture`} />

      <div className="container-fluid">
        <div className="row">
          <div
            className="col-12 col-md-4 col-xl-3 bg-cream min-height-100vh-md"
            style={{ position: 'sticky' }}
          >
            <Sidebar geo={geo} query={query} />
          </div>
          <div className="col-12 col-md-8 col-xl-9">
            <div className="px-4 py-4">
              <TemperatureSection results={results} />
              <div style={{ marginTop: 60 }}>
                <FloodingSection results={results} />
              </div>
              <div style={{ marginTop: 60 }}>
                <PrecipitationSection results={results} />
              </div>
              <div style={{ marginTop: 60 }}>
                <hr />
              </div>
              <Methodology className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Location.getInitialProps = async function(context) {
  const query = {
    address: context.query.address.replace('-', ' '),
    year: context.query.year || DEFAULT_YEAR,
  };
  const paramString = queryString.stringify(query);

  const response = await fetch(`${process.env.API_HOST}/locations?${paramString}`);
  const data = await response.json();
  return {
    query: query,
    geo: data.geo,
    // Transform results from an array to an object
    results: data.results.reduce((obj, result) => {
      obj[result.attribute] = result;
      return obj;
    }, {}),
  };
};
