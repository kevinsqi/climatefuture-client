import React from 'react';

import HorizontalBarChart from './HorizontalBarChart';
import RelativeResult from './RelativeResult';

export default function Temperature(props) {
  const {
    temp_num_days_above_90f,
    temp_num_days_above_100f,
    temp_num_days_below_32f,
    temp_avg,
  } = props.results;
  if (
    !temp_num_days_above_90f &&
    !temp_num_days_above_100f &&
    !temp_num_days_below_32f &&
    !temp_avg
  ) {
    return null;
  }
  // TODO: methodology
  const showAdvice =
    temp_num_days_above_100f &&
    temp_num_days_above_100f.rcp85_mean - temp_num_days_above_100f.historical_average > 10;
  return (
    <div>
      <h3 className="h1 font-weight-bold">🔥 Temperature</h3>
      <div className="mt-5">
        <h4>How could the temperature change?</h4>
        <RelativeResult
          className="mt-2"
          result={temp_avg}
          unit="°F"
          chartScale={HorizontalBarChart.SCALES.temperature}
        />
      </div>
      <div className="mt-4">
        <h4>How many days could be hotter than 90°F?</h4>
        <RelativeResult
          className="mt-2"
          result={temp_num_days_above_90f}
          unit="days"
          className="mt-2"
          chartScale={HorizontalBarChart.SCALES.year}
        />
      </div>
      <div className="mt-4">
        <h4>How many days could be hotter than 100°F?</h4>
        <RelativeResult
          className="mt-2"
          result={temp_num_days_above_100f}
          unit="days"
          className="mt-2"
          chartScale={HorizontalBarChart.SCALES.year}
        />
      </div>
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
