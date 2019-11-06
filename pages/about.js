import React from 'react';
import Head from '../components/Head';

function About() {
  return (
    <div className="bg-cream">
      <Head title="About ClimateFuture" />
      <div className="height-100vh d-flex flex-column">
        <div className="flex-1 d-flex flex-column justify-content-center align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 offset-md-1">
                <h2 className="h3 font-weight-bold">About ClimateFuture</h2>

                <p className="mt-4">
                  ClimateFuture started as a project for Science Hack Day 2019 with Kevin Qi, Becky
                  Marjerison, Tara Lin, Marie Lu, and Shannon Fiume.
                </p>
                <p>
                  We aim to make it easy to see future impacts of climate change at any given
                  location, along with localized preparation advice and other possible actions you
                  can take.
                </p>
                <p>
                  The data is aggregated from multiple public data sources, and are oriented around
                  the{' '}
                  <a href="https://en.wikipedia.org/wiki/Representative_Concentration_Pathway">
                    IPCC's RCP 2.6, RCP 4.5, and RCP 8.5
                  </a>{' '}
                  greenhouse gas concentration scenarios.
                </p>
                <p>
                  If you're interested in helping with the project, email Kevin at{' '}
                  <a href="mailto:iqnivek@gmail.com">iqnivek@gmail.com</a>. We're primarily looking
                  for people with backgrounds in climate science, or people interested in finding
                  data sources to integrate into the site&mdash;but anyone is welcome to help!
                </p>
                <div className="mt-5">
                  <a href="/">← Home</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ paddingBottom: 100 }} />
        </div>
      </div>
    </div>
  );
}

export default About;
