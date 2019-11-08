import React from 'react';

import Result from './Result';

export default function Temperature({ results }) {
  const attributes = ['temp_avg', 'temp_num_days_above_90f', 'temp_num_days_above_100f'];

  if (attributes.every((attr) => !results[attr])) {
    return null;
  }

  // TODO: methodology
  const showAdvice =
    results.temp_num_days_above_100f &&
    results.temp_num_days_above_100f.rcp85_mean -
      results.temp_num_days_above_100f.historical_average >
      10;

  return (
    <div>
      <h3 className="h1 font-weight-bold">🔥 Temperature</h3>

      {attributes.map((attr) => {
        const result = results[attr];
        return <Result result={result} key={attr} />;
      })}

      {showAdvice && (
        <div className="mt-4">
          <h4>How can I prepare?</h4>
          <ul className="list-unstyled font-weight-600 small">
            <li>Insulate windows.</li>
            <li>Install temporary window reflectors.</li>
            <li>Install cool or green roofs.</li>
            <li>Support planting trees to provide shade and cooler air.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
