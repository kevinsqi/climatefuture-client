import React from 'react';
import classNames from 'classnames';

import { SCENARIOS } from './constants';
import DataNumber from './DataNumber';
import HorizontalBarChart from './HorizontalBarChart';

function formatNumberChange(diff, unit) {
  const num = Number(diff);
  const marker = Math.abs(num) < 0.1 ? '' : num > 0 ? '▲' : '▼';
  return `${marker} ${parseFloat(num.toFixed(1))} ${unit}`;
}

export default function RelativeResult({ result, unit, className, chartScale }) {
  if (!result) {
    return null;
  }
  const { rcp45_mean, rcp85_mean, historical_average } = result;
  return (
    <div className={classNames('row no-gutters mx-n1', className)}>
      <div className="col-12 col-md-4 d-flex px-1">
        <DataNumber className="flex-1" label={SCENARIOS.RCP_26} value="---" />
      </div>
      <div className="col-12 col-md-4 d-flex px-1">
        <DataNumber
          className="flex-1"
          label={SCENARIOS.RCP_45}
          value={formatNumberChange(rcp45_mean - historical_average, unit)}
        >
          {chartScale && (
            <HorizontalBarChart
              scale={chartScale}
              values={[
                {
                  label: `Historical average: ${parseFloat(historical_average.toFixed(1))} ${unit}`,
                  value: historical_average,
                },
                {
                  label: `Projected: ${parseFloat(rcp45_mean.toFixed(1))} ${unit}`,
                  value: rcp45_mean,
                },
              ]}
            />
          )}
        </DataNumber>
      </div>
      <div className="col-12 col-md-4 d-flex px-1">
        <DataNumber
          className="flex-1"
          label={SCENARIOS.RCP_85}
          value={formatNumberChange(rcp85_mean - historical_average, unit)}
        >
          {chartScale && (
            <HorizontalBarChart
              scale={chartScale}
              values={[
                {
                  label: `Historical average: ${parseFloat(historical_average.toFixed(1))} ${unit}`,
                  value: historical_average,
                },
                {
                  label: `Projected: ${parseFloat(rcp85_mean.toFixed(1))} ${unit}`,
                  value: rcp85_mean,
                },
              ]}
            />
          )}
        </DataNumber>
      </div>
    </div>
  );
}
