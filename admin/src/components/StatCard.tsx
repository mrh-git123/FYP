import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
}

const StatCard = ({ label, value, delta, icon }: Props) => (
  <article className="stat-card">
    <div>
      <p className="stat-label">{label}</p>
      <h3>{value}</h3>
    </div>
    <div className="stat-meta">
      {delta && <span className="badge success">{delta}</span>}
      {icon}
    </div>
  </article>
);

export default StatCard;
