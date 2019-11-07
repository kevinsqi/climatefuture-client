import React from 'react';
import classNames from 'classnames';

export default function DataNumber({ label, value, description, className, children }) {
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
