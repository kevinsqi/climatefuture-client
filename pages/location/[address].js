import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';

import Head from '../../components/Head';
import LocationPage from '../../components/LocationPage';

const DEFAULT_YEAR = 2080;

export default function Location({ geo, results, query }) {
  return (
    <div>
      <Head
        title={`Projected climate change impacts for ${geo.formatted_address} in ${query.year} | ClimateFuture`}
      />
      <LocationPage geo={geo} results={results} query={query} />
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
