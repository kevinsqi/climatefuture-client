import React from 'react';

import { SCENARIOS } from './constants';
import DataNumber from './DataNumber';

export default function Flooding(props) {
  const { coastal_flooding_single_year_5ft } = props.results;
  if (!coastal_flooding_single_year_5ft) {
    return null;
  }
  const { rcp26, rcp45, rcp85 } = coastal_flooding_single_year_5ft;
  const showAdvice = Number(rcp45) >= 0.1;
  return (
    <div className={props.className}>
      <h3 className="h1 font-weight-bold">🌊 Flooding</h3>
      <div className="mt-4">
        <h4>What's the chance of a 5+ foot coastal flood within 1 year?</h4>
        <div className="mt-3">
          <Result result={coastal_flooding_single_year_5ft} />
        </div>
      </div>
      {showAdvice && (
        <React.Fragment>
          <div className="mt-4">
            <h4>How can I prepare short-term?</h4>
            <ul className="list-unstyled font-weight-600 small">
              <li>Have backup food, water, and medical supplies.</li>
              <li>Unplug electrical equipment that might contact flood water.</li>
              <li>Be careful of carbon monoxide poisoning when using portable generators.</li>
            </ul>
          </div>
          <div className="mt-4">
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
