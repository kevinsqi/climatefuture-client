import React from 'react';
import classNames from 'classnames';

import Sidebar from './Sidebar';

export const SCENARIOS = {
  RCP_26: 'Optimistic case',
  RCP_45: 'Status quo',
  RCP_85: 'Worst case',
};

function formatTempChange(diff) {
  const num = (Number(diff) * 9) / 5;
  const marker = Math.abs(num) < 0.1 ? '' : num > 0 ? '▲' : '▼';
  return `${marker} ${parseFloat(num.toFixed(1))}° F`;
}

function formatNumberChange(diff, unit) {
  const num = Number(diff);
  const marker = Math.abs(num) < 0.1 ? '' : num > 0 ? '▲' : '▼';
  return `${marker} ${parseFloat(num.toFixed(1))} ${unit}`;
}

function DataHeader(props) {
  return (
    <div className="row">
      <div className="col-4">
        <DataNumber label={SCENARIOS.RCP_26} />
      </div>
      <div className="col-4">
        <DataNumber label={SCENARIOS.RCP_45} />
      </div>
      <div className="col-4">
        <DataNumber label={SCENARIOS.RCP_85} />
      </div>
    </div>
  );
}

function DataNumber({ label, value, description }) {
  return (
    <div>
      <div className="small text-secondary font-weight-600">{label}</div>
      <div style={{ fontSize: 25 }}>{value}</div>
      <div className="small text-secondary">{description}</div>
    </div>
  );
}

export function Methodology(props) {
  return (
    <div className={props.className}>
      <div className="small text-secondary">
        <div>
          <strong>Methodology</strong>
        </div>
        <div>
          "{SCENARIOS.RCP_26}" uses RCP 2.6, "{SCENARIOS.RCP_45}" uses RCP 4.5, and "
          {SCENARIOS.RCP_85}" uses RCP 8.5.
        </div>
        <div>
          <a className="text-secondary" href="https://github.com/kevinsqi/climatefuture">
            View source code
          </a>{' '}
        </div>
      </div>
    </div>
  );
}

export function FloodingSection(props) {
  const { coastal_flooding_single_year_5ft } = props.results;
  if (!coastal_flooding_single_year_5ft) {
    return null;
  }
  const { rcp26, rcp45, rcp85 } = coastal_flooding_single_year_5ft;
  const showAdvice = Number(rcp45) >= 0.1;
  return (
    <div className={props.className}>
      <h3 className="h1 font-weight-bold">🌊 Coastal Flooding</h3>
      <div className="mt-4">
        <div className="row">
          <div className="col-4">
            <DataNumber
              label={SCENARIOS.RCP_26}
              value={`${Math.round(rcp26 * 100)}% chance > 5ft`}
            />
          </div>
          <div className="col-4">
            <DataNumber
              label={SCENARIOS.RCP_45}
              value={`${Math.round(rcp45 * 100)}% chance > 5ft`}
            />
          </div>
          <div className="col-4">
            <DataNumber
              label={SCENARIOS.RCP_85}
              value={`${Math.round(rcp85 * 100)}% chance > 5ft`}
            />
          </div>
        </div>
      </div>
      {showAdvice && (
        <React.Fragment>
          <div className="mt-5">
            <div className="small text-secondary font-weight-600">
              How can I prepare short-term?
            </div>
            <div className="mt-2 font-weight-600 text-11">
              <div>Have backup food, water, and medical supplies.</div>
              <div>Unplug electrical equipment that might contact flood water.</div>
              <div>Be careful of carbon monoxide poisoning when using portable generators.</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="small text-secondary font-weight-600">How can I prepare long-term?</div>
            <div className="mt-2 font-weight-600 text-11">
              <div>
                Check if your home is in a floodplain at <a href="https://msc.fema.gov">FEMA</a>.
              </div>
              <div>Check if your home was built with flood damage-resistant materials.</div>
              <div>Check if there are community floodwalls or levees.</div>
              <div>Support local government in developing flood control plans.</div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export function PrecipitationSection(props) {
  const { precipitation_total, precipitation_num_dry_days } = props.results;
  if (!precipitation_num_dry_days && !precipitation_total) {
    return null;
  }
  return (
    <div className={props.className}>
      <h3 className="h1 font-weight-bold">🌧️ Precipitation</h3>
      <div className="mt-4">
        <DataHeader />
        <AcisResult result={precipitation_total} unit="in" />
        <AcisResult result={precipitation_num_dry_days} unit="dry days" className="mt-2" />
      </div>
    </div>
  );
}

export function TemperatureSection(props) {
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
      <div className="mt-4">
        <DataHeader />
        <AcisResult result={temp_avg} unit="°F" />
        <AcisResult result={temp_num_days_above_90f} unit="days >90°F" className="mt-2" />
        <AcisResult result={temp_num_days_above_100f} unit="days >100°F" className="mt-2" />
        <AcisResult result={temp_num_days_below_32f} unit="days <32°F" className="mt-2" />
      </div>
      {showAdvice && (
        <div className="mt-5">
          <div className="small text-secondary font-weight-600">How can I prepare?</div>
          <div className="mt-2 font-weight-600 text-11">
            <div>🏠 Insulate windows.</div>
            <div>🏠 Install temporary window reflectors.</div>
            <div>🏠 Install cool or green roofs.</div>
            <div>🌲 Support planting trees to provide shade and cooler air.</div>
          </div>
        </div>
      )}
    </div>
  );
}

function AcisResult({ result, unit, className }) {
  if (!result) {
    return null;
  }
  const { rcp45_mean, rcp85_mean, historical_average } = result;
  return (
    <div className={classNames('row', className)}>
      <div className="col-4">
        <DataNumber value="--" />
      </div>
      <div className="col-4">
        <DataNumber
          value={formatNumberChange(rcp45_mean - historical_average, unit)}
          description={`Relative to historical average of ${parseFloat(
            historical_average.toFixed(1),
          )} ${unit}`}
        />
      </div>
      <div className="col-4">
        <DataNumber
          value={formatNumberChange(rcp85_mean - historical_average, unit)}
          description={`Relative to historical average of ${parseFloat(
            historical_average.toFixed(1),
          )} ${unit}`}
        />
      </div>
    </div>
  );
}

export function LocationPage({ geo, results, query }) {
  return (
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
  );
}
