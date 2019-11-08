import React from 'react';
import _ from 'lodash';

import { CHART_SCALES } from './constants';
import RelativeResult from './RelativeResult';

function Item({ label, description, children }) {
  return (
    <div className="mt-4">
      <h4>{label}</h4>
      {description && <p>{description}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function AverageTemperature({ result }) {
  return (
    <Item label="How could the temperature change?">
      <RelativeResult result={result} unit="°F" chartScale={CHART_SCALES.temperature} />
    </Item>
  );
}
AverageTemperature.attribute = 'temp_avg';

function NumDaysAbove90F({ result }) {
  return (
    <Item label="How many days could be hotter than 90°F?">
      <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
    </Item>
  );
}
NumDaysAbove90F.attribute = 'temp_num_days_above_90f';

function NumDaysAbove100F({ result }) {
  return (
    <Item label="How many days could be hotter than 100°F?">
      <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
    </Item>
  );
}
NumDaysAbove100F.attribute = 'temp_num_days_above_100f';

const RESULT_COMPONENTS = {
  AverageTemperature,
  NumDaysAbove90F,
  NumDaysAbove100F,
};

function Result({ result }) {
  const Component = _.find(RESULT_COMPONENTS, (comp) => comp.attribute === result.attribute);

  if (!Component) {
    throw new Error(`No component for attribute ${result.attribute}`);
  }

  return <Component result={result} />;
}

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
