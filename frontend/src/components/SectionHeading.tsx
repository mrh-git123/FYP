import type { ReactNode } from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

const SectionHeading = ({ eyebrow, title, description, action }: Props) => (
  <header className="section-heading">
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
    {action && <div className="heading-action">{action}</div>}
  </header>
);

export default SectionHeading;
