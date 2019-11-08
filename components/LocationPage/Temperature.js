import React from 'react';

import { CHART_SCALES } from './constants';
import RelativeResult from './RelativeResult';

function SectionItem({ label, description, children }) {
  return (
    <div className="mt-4">
      <h4>{label}</h4>
      {description && <p>{description}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

function AverageTempItem({ result }) {
  return (
    <SectionItem label="How could the temperature change?">
      <RelativeResult result={result} unit="°F" chartScale={CHART_SCALES.temperature} />
    </SectionItem>
  );
}

function NumDaysAbove90F({ result }) {
  return (
    <SectionItem label="How many days could be hotter than 90°F?">
      <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
    </SectionItem>
  );
}

function NumDaysAbove100F({ result }) {
  return (
    <SectionItem label="How many days could be hotter than 100°F?">
      <RelativeResult result={result} unit="days" chartScale={CHART_SCALES.year} />
    </SectionItem>
  );
}

export default function Temperature(props) {
  const { temp_num_days_above_90f, temp_num_days_above_100f, temp_avg } = props.results;
  if (!temp_num_days_above_90f && !temp_num_days_above_100f && !temp_avg) {
    return null;
  }
  // TODO: methodology
  const showAdvice =
    temp_num_days_above_100f &&
    temp_num_days_above_100f.rcp85_mean - temp_num_days_above_100f.historical_average > 10;
  return (
    <div>
      <h3 className="h1 font-weight-bold">🔥 Temperature</h3>

      <AverageTempItem result={temp_avg} />
      <NumDaysAbove90F result={temp_num_days_above_90f} />
      <NumDaysAbove100F result={temp_num_days_above_100f} />
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
