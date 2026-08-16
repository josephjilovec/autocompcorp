'use client';

import { useMemo, useState } from 'react';

const certifications = ['SOC 2', 'ISO 27001', 'HIPAA'] as const;

type Certification = (typeof certifications)[number];

export default function ComplianceROICalculator() {
  const [employees, setEmployees] = useState(250);
  const [selected, setSelected] = useState<Certification[]>(['SOC 2', 'ISO 27001']);

  const results = useMemo(() => {
    const count = selected.length;
    if (count === 0) return { baseline: 0, saved: 0, laborValue: 0, weeks: 0 };

    const baseline = Math.round(count * (110 + employees * 1.6));
    const saved = Math.round(baseline * 0.58);
    const laborValue = saved * 95;
    const weeks = Math.round((saved / 40) * 10) / 10;
    return { baseline, saved, laborValue, weeks };
  }, [employees, selected]);

  const toggleCertification = (certification: Certification) => {
    setSelected((current) => current.includes(certification)
      ? current.filter((item) => item !== certification)
      : [...current, certification]);
  };

  return (
    <div className="roi-calculator">
      <div className="roi-controls">
        <div className="roi-control-heading"><span>PLANNING INPUTS</span><strong>Model your compliance workload</strong></div>

        <label className="employee-slider">
          <span><b>Employees</b><strong>{employees.toLocaleString()}</strong></span>
          <input
            type="range"
            min="25"
            max="2500"
            step="25"
            value={employees}
            onChange={(event) => setEmployees(Number(event.target.value))}
            aria-label="Employee count"
          />
          <small><span>25</span><span>2,500</span></small>
        </label>

        <div className="certification-picker">
          <span>Target frameworks / certifications</span>
          <div>{certifications.map((certification) => <button
            key={certification}
            type="button"
            aria-pressed={selected.includes(certification)}
            onClick={() => toggleCertification(certification)}
          ><i />{certification}</button>)}</div>
        </div>

        <div className="roi-assumptions">
          <strong>Illustrative model assumptions</strong>
          <p>Uses a planning estimate of 110 fixed audit-preparation hours per framework plus 1.6 hours per employee, with 58% of that workload modeled as automatable evidence collection, reconciliation, and audit preparation.</p>
          <small>Not a guarantee of savings. Actual effort varies by scope, maturity, auditor, systems, and control environment.</small>
        </div>
      </div>

      <div className="roi-results" aria-live="polite">
        <div className="roi-result-heading"><span>MODELED IMPACT</span><strong>{selected.length ? selected.join(' + ') : 'Select at least one framework'}</strong></div>
        <div className="roi-primary-result"><small>Potential annual audit hours reclaimed</small><strong>{results.saved.toLocaleString()}</strong><span>hours / year</span></div>
        <div className="roi-result-grid">
          <article><span>Baseline effort</span><strong>{results.baseline.toLocaleString()} hrs</strong></article>
          <article><span>Equivalent team time</span><strong>{results.weeks.toLocaleString()} weeks</strong></article>
          <article><span>Modeled labor value</span><strong>${results.laborValue.toLocaleString()}</strong><small>at $95/hr loaded cost</small></article>
        </div>
        <div className="roi-value-note"><i />The highest-value savings come from removing repetitive evidence chasing while keeping approvals and consequential decisions with accountable humans.</div>
      </div>
    </div>
  );
}
