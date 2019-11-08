import React from 'react';

import { CHART_SCALES } from './constants';
import RelativeResult from './RelativeResult';

export default function Precipitation(props) {
  const { precipitation_total, precipitation_num_dry_days } = props.results;
  if (!precipitation_num_dry_days && !precipitation_total) {
    return null;
  }
  return (
    <div className={props.className}>
      <h3 className="h1 font-weight-bold">🌧️ Precipitation</h3>
      <div className="mt-5">
        <h4>How could the amount of precipitation (rain or snow) change?</h4>
        <RelativeResult
          className="mt-2"
          result={precipitation_total}
          unit="inches"
          chartScale={CHART_SCALES.precipitation}
        />
      </div>
      <div className="mt-4">
        <h4>How could the number of dry days change?</h4>
        <div className="row">
          <div className="col-12 col-md-8">
            <p>
              Changes in the number of dry days per year (days when there's less than 0.01 inches of
              snow or rain) can indicate a tendency toward drier or wetter conditions.
            </p>
          </div>
        </div>
        <RelativeResult
          className="mt-2"
          result={precipitation_num_dry_days}
          unit="days"
          chartScale={CHART_SCALES.year}
        />
      </div>
    </div>
  );
}
