type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const normalized = status.toLowerCase();
  const variant =
    normalized === 'delivered'
      ? 'success'
      : normalized === 'pending'
      ? 'pending'
      : normalized === 'cancelled'
      ? 'danger'
      : 'ghost';

  return <span className={`badge ${variant}`}>{status}</span>;
};

export default StatusBadge;
