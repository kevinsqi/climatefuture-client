import React from 'react';
import _ from 'lodash';

import { CHART_SCALES } from './constants';
import RelativeResult from './RelativeResult';

function Item({ label, description, children }) {
  return (
    <div className="mt-4">
      <h4>{label}</h4>
      {description && (
        <div className="row">
          <div className="col-12 col-md-8">
            <p className="mb-0">{description}</p>
          </div>
        </div>
      )}
      <div className="mt-3">{children}</div>
    </div>
  );
}

const RESULT_COMPONENTS = {
  temp_avg: ({ result }) => {
    return (
      <Item label="How could the temperature change?">
        <RelativeResult result={result} unit="°F" chartScale={CHART_SCALES.temperature} />
      </Item>
    );
  },
  temp_num_days_above_90f: ({ result }) => {
    return (
      <Item label="How many more 90°F+ degree days could there be?">
        <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
      </Item>
    );
  },
  temp_num_days_above_100f: ({ result }) => {
    return (
      <Item label="How many more 100°F+ degree days could there be?">
        <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
      </Item>
    );
  },
  precipitation_total: ({ result }) => {
    return (
      <Item label="How could the amount of precipitation (rain or snow) change?">
        <RelativeResult result={result} unit="inches" chartScale={CHART_SCALES.precipitation} />
      </Item>
    );
  },
  precipitation_num_dry_days: ({ result }) => {
    return (
      <Item
        label="How many more dry days could there be?"
        description={
          "Changes in the number of dry days per year (days when there's less than 0.01 inches of snow or rain) can indicate a tendency toward drier or wetter conditions."
        }
      >
        <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
      </Item>
    );
  },
};

export default function Result({ result }) {
  const Component = RESULT_COMPONENTS[result.attribute];

  if (!Component) {
    throw new Error(`No component for attribute ${result.attribute}`);
  }

  return <Component result={result} />;
}
