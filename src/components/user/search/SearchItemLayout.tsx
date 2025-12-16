import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  badge: ReactNode;
  title: string;
  description?: string;
  meta: ReactNode;
}

const SearchItemLayout = ({ icon, badge, title, description, meta }: Props) => {
  return (
    <div className="bg-card border-border hover:border-primary group cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start gap-5">
        <div className="from-muted to-muted/50 rounded-xl bg-linear-to-br p-4 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-3">{badge}</div>

          <h3 className="text-card-foreground group-hover:text-primary mb-2 line-clamp-1 text-xl font-bold transition-colors">
            {title}
          </h3>

          {description && (
            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">{description}</p>
          )}

          <div className="flex flex-wrap items-center gap-5 text-sm">{meta}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchItemLayout;
