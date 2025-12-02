import type { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  delta?: string;
  icon?: ReactNode;
}

const StatCard = ({ label, value, delta, icon }: Props) => {
  const isNegative = delta?.startsWith('-');
  const badgeVariant = isNegative ? 'pending' : 'success';
  
  return (
    <article className="stat-card">
      <div>
        <p className="stat-label">{label}</p>
        <h3>{value}</h3>
        {delta && <span className={`badge ${badgeVariant}`} style={{ marginTop: '0.5rem' }}>{delta}</span>}
      </div>
      <div className="stat-meta">
        {icon}
      </div>
    </article>
  );
};

export default StatCard;
