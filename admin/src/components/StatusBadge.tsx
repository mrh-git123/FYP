type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const normalized = status.toLowerCase();
  
  const getVariant = () => {
    switch (normalized) {
      case 'delivered':
      case 'paid':
        return 'success';
      case 'pending':
        return 'pending';
      case 'cancelled':
      case 'refunded':
        return 'danger';
      case 'processing':
      case 'shipped':
        return 'info';
      default:
        return 'ghost';
    }
  };

  return <span className={`badge ${getVariant()}`}>{status}</span>;
};

export default StatusBadge;
