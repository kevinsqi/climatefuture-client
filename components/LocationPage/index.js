import React from 'react';
import classNames from 'classnames';

import Sidebar from './Sidebar';

export const SCENARIOS = {
  RCP_26: 'Best case',
  RCP_45: 'Middle case',
  RCP_85: 'Worst case',
};

const CHART_SCALES = {
  year: {
    min: 0,
    minLabel: '0 days',
    max: 365,
    maxLabel: '365 days',
  },
  temperature: {
    min: 32,
    minLabel: '32 F',
    max: 100,
    maxLabel: '100 F',
  },
  precipitation: {
    min: 0,
    minLabel: '0 inches',
    max: 100,
    maxLabel: '100 inches',
  },
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

function DataNumber({ label, value, description, className, children }) {
  return (
    <div className={classNames('DataNumber d-flex flex-column', className)}>
      <div className="flex-1">
        <div className="small text-secondary font-weight-600">{label}</div>
        <div style={{ fontSize: 25 }}>{value}</div>
        {description && <div className="small text-secondary">{description}</div>}
      </div>
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function Methodology(props) {
  return (
    <div className={props.className}>
      <div className="small text-secondary">
        <div className="font-weight-bold">Methodology</div>
        <div>
          ClimateFuture uses public data sources with projections on future conditions based on{' '}
          <a
            className="text-secondary"
            href="https://en.wikipedia.org/wiki/Representative_Concentration_Pathway"
          >
            RCP greenhouse gas concentration scenarios
          </a>{' '}
          modeled by the IPCC. "{SCENARIOS.RCP_26}" corresponds to RCP 2.6, "{SCENARIOS.RCP_45}" to
          RCP 4.5, and "{SCENARIOS.RCP_85}" to RCP 8.5. ClimateFuture is an open source
          project&mdash;
          <a className="text-secondary" href="https://github.com/kevinsqi/climatefuture">
            view the source code on Github
          </a>{' '}
          or{' '}
          <a className="text-secondary" href="/about">
            learn more about it
          </a>
          .
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
      <div className="mt-5">
        <h4>What's the chance of a 5+ foot flood within 1 year?</h4>
        <Result result={coastal_flooding_single_year_5ft} />
      </div>
      {showAdvice && (
        <React.Fragment>
          <div className="mt-5">
            <h4>How can I prepare short-term?</h4>
            <ul className="list-unstyled font-weight-600 small">
              <li>Have backup food, water, and medical supplies.</li>
              <li>Unplug electrical equipment that might contact flood water.</li>
              <li>Be careful of carbon monoxide poisoning when using portable generators.</li>
            </ul>
          </div>
          <div className="mt-5">
            <h4>How can I prepare long-term?</h4>
            <ul className="list-unstyled font-weight-600 small">
              <li>
                Check if your home is in a floodplain at <a href="https://msc.fema.gov">FEMA</a>.
              </li>
              <li>Check if your home was built with flood damage-resistant materials.</li>
              <li>Check if there are community floodwalls or levees.</li>
              <li>Support local government in developing flood control plans.</li>
            </ul>
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
      <div className="mt-5">
        <h4>How could the amount of precipitation (rain or snow) change?</h4>
        <RelativeResult
          className="mt-2"
          result={precipitation_total}
          unit="in"
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
      <div className="mt-5">
        <h4>How could the temperature change?</h4>
        <RelativeResult
          className="mt-2"
          result={temp_avg}
          unit="°F"
          chartScale={CHART_SCALES.temperature}
        />
      </div>
      <div className="mt-4">
        <h4>How many days could be hotter than 90°F?</h4>
        <RelativeResult
          className="mt-2"
          result={temp_num_days_above_90f}
          unit="days"
          className="mt-2"
          chartScale={CHART_SCALES.year}
        />
      </div>
      <div className="mt-4">
        <h4>How many days could be hotter than 100°F?</h4>
        <RelativeResult
          className="mt-2"
          result={temp_num_days_above_100f}
          unit="days"
          className="mt-2"
          chartScale={CHART_SCALES.year}
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

function HorizontalBarChart({ values, scale }) {
  // Have the max be the larger of scale.max and max value
  const max = Math.max(scale.max, Math.max(...values.map(({ value }) => value)));
  const min = scale.min;
  const range = max - min;
  return (
    <div className="width-full">
      {values.map(({ label, value }) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return (
          <div className="small">
            <div
              className="d-inline-block v-align-middle mr-2"
              style={{
                background: '#b9b297',
                width: `${percentage}%`,
                minWidth: 1,
                height: '1em',
              }}
            />
            <div className="d-inline-block v-align-middle small text-secondary">{label}</div>
          </div>
        );
      })}
    </div>
  );
}

function RelativeResult({ result, unit, className, chartScale }) {
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

function Result({ result, unit, className }) {
  const { rcp26, rcp45, rcp85 } = result;
  return (
    <div className="row no-gutters mx-n1">
      <div className="col-4 d-flex px-1">
        <DataNumber
          className="flex-1"
          label={SCENARIOS.RCP_26}
          value={`${Math.round(rcp26 * 100)}% chance`}
        />
      </div>
      <div className="col-4 d-flex px-1">
        <DataNumber
          className="flex-1"
          label={SCENARIOS.RCP_45}
          value={`${Math.round(rcp45 * 100)}% chance`}
        />
      </div>
      <div className="col-4 d-flex px-1">
        <DataNumber
          className="flex-1"
          label={SCENARIOS.RCP_85}
          value={`${Math.round(rcp85 * 100)}% chance`}
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
          <div className="px-3 px-md-4 py-4">
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
