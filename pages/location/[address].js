import React from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';

import Head from '../../components/Head';
import Sidebar from '../../components/Sidebar';

const DEFAULT_YEAR = 2080;

const SCENARIOS = {
  RCP_26: 'Optimistic case',
  RCP_45: 'Status quo',
  RCP_85: 'Worst case',
};

function Methodology(props) {
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
          <a
            className="text-secondary"
            href="https://github.com/kevinsqi/climatefuture/tree/master/server/data"
          >
            View data sources
          </a>
        </div>
      </div>
    </div>
  );
}

function FloodingSection(props) {
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
            <div className="small text-secondary font-weight-bold">
              How can I prepare short-term?
            </div>
            <div className="mt-2" style={{ fontSize: '1.2em', fontWeight: 600 }}>
              <div>Have backup food, water, and medical supplies.</div>
              <div>Unplug electrical equipment that might contact flood water.</div>
              <div>Be careful of carbon monoxide poisoning when using portable generators.</div>
            </div>
          </div>
          <div className="mt-5">
            <div className="small text-secondary font-weight-bold">
              How can I prepare long-term?
            </div>
            <div className="mt-2" style={{ fontSize: '1.2em', fontWeight: 600 }}>
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

function PrecipitationSection(props) {
  const { num_dry_days } = props.results;
  if (!num_dry_days) {
    return null;
  }
  const { rcp45_weighted_mean, rcp85_weighted_mean, historical_average } = num_dry_days;
  const unit = 'dry days';
  return (
    <div className={props.className}>
      <h3 className="h1 font-weight-bold">🌧️ Precipitation</h3>
      <div className="mt-4">
        <div className="row">
          <div className="col-4">
            <DataNumber label={SCENARIOS.RCP_26} value="--" />
          </div>
          <div className="col-4">
            <DataNumber
              label={SCENARIOS.RCP_45}
              value={formatNumberChange(rcp45_weighted_mean - historical_average, unit)}
              description={`Relative to historical average of ${historical_average.toFixed(
                1,
              )} days`}
            />
          </div>
          <div className="col-4">
            <DataNumber
              label={SCENARIOS.RCP_85}
              value={formatNumberChange(rcp85_weighted_mean - historical_average, unit)}
              description={`Relative to historical average of ${historical_average.toFixed(
                1,
              )} days`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTempChange(diff) {
  const num = (Number(diff) * 9) / 5;
  const marker = Math.abs(num) < 0.1 ? '' : num > 0 ? '▲' : '▼';
  return `${marker} ${num.toFixed(1)}° F`;
}

function formatNumberChange(diff, unit) {
  const num = Number(diff);
  const marker = Math.abs(num) < 0.1 ? '' : num > 0 ? '▲' : '▼';
  return `${marker} ${num.toFixed(1)} ${unit}`;
}

function DataNumber({ label, value, description }) {
  return (
    <div>
      <div className="small text-secondary font-weight-bold">{label}</div>
      <div style={{ fontSize: 25 }}>{value}</div>
      <div className="small text-secondary">{description}</div>
    </div>
  );
}

function NumDaysAbove100F(props) {
  if (!props.result) {
    return null;
  }
  const { rcp45_weighted_mean, rcp85_weighted_mean, historical_average } = props.result;
  const unit = 'days >100°F';
  return (
    <div className="row">
      <div className="col-4">
        <DataNumber value="--" />
      </div>
      <div className="col-4">
        <DataNumber
          value={formatNumberChange(rcp45_weighted_mean - historical_average, unit)}
          description={`Relative to historical average of ${historical_average.toFixed(1)} days`}
        />
      </div>
      <div className="col-4">
        <DataNumber
          value={formatNumberChange(rcp85_weighted_mean - historical_average, unit)}
          description={`Relative to historical average of ${historical_average.toFixed(1)} days`}
        />
      </div>
    </div>
  );
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

function Temperature(props) {
  if (!props.result) {
    return null;
  }
  const {
    year_start,
    year_end,
    model_26_warming,
    model_45_warming,
    model_85_warming,
  } = props.result;
  return (
    <div className="row">
      <div className="col-4">
        <DataNumber value={formatTempChange(model_26_warming)} />
      </div>
      <div className="col-4">
        <DataNumber value={formatTempChange(model_45_warming)} />
      </div>
      <div className="col-4">
        <DataNumber value={formatTempChange(model_85_warming)} />
      </div>
    </div>
  );
}

function TemperatureSection(props) {
  const { temperature_increase, num_days_above_100f } = props.results;
  if (!temperature_increase && !num_days_above_100f) {
    return null;
  }
  // TODO: methodology
  const showAdvice =
    num_days_above_100f &&
    num_days_above_100f.rcp85_weighted_mean - num_days_above_100f.historical_average > 10;
  return (
    <div>
      <h3 className="h1 font-weight-bold">🔥 Temperature</h3>
      <div className="mt-4">
        <DataHeader />
        <Temperature result={temperature_increase} />
        <div className="mt-2">
          <NumDaysAbove100F result={num_days_above_100f} />
        </div>
      </div>
      {showAdvice && (
        <div className="mt-5">
          <div className="small text-secondary font-weight-bold">How can I prepare?</div>
          <div className="mt-2" style={{ fontSize: '1.2em', fontWeight: 600 }}>
            <div>Insulate windows.</div>
            <div>Install temporary window reflectors.</div>
            <div>Install cool or green roofs.</div>
            <div>Support planting trees to provide shade and cooler air.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Location({ geo, results, query }) {
  return (
    <div>
      <Head title={`${geo.formatted_address} | ClimateFuture`} />

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
    </div>
  );
}

Location.getInitialProps = async function(context) {
  const query = {
    address: context.query.address.replace('-', ' '),
    year: context.query.year || DEFAULT_YEAR,
  };
  const paramString = queryString.stringify(query);

  const response = await fetch(`${process.env.API_HOST}/locations?${paramString}`);
  const data = await response.json();
  return {
    query: query,
    geo: data.geo,
    // Transform results from an array to an object
    results: data.results.reduce((obj, result) => {
      obj[result.attribute] = result;
      return obj;
    }, {}),
  };
};
