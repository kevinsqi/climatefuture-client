import React from 'react';

import { CHART_SCALES } from './constants';
import Result from './Result';

export default function Precipitation({ results }) {
  const attributes = ['precipitation_total', 'precipitation_num_dry_days'];

  if (attributes.every((attr) => !results[attr])) {
    return null;
  }

  return (
    <div>
      <h3 className="h1 font-weight-bold">🌧️ Precipitation</h3>

      {attributes.map((attr) => {
        const result = results[attr];
        return <Result result={result} key={attr} />;
      })}
    </div>
  );
}
