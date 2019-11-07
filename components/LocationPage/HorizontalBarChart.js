import React from 'react';

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
          <div className="small" key={value}>
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

HorizontalBarChart.SCALES = {
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

export default HorizontalBarChart;
