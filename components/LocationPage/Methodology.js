import React from 'react';

import { SCENARIOS } from './constants';

export default function Methodology(props) {
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
