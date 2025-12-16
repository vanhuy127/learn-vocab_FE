import { SearchX } from 'lucide-react';

interface Props {
  keyword?: string;
}

const SearchEmpty = ({ keyword }: Props) => {
  return (
    <div className="animate-in fade-in flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-muted mb-6 rounded-full p-6">
        <SearchX className="text-muted-foreground h-12 w-12" />
      </div>

      <h3 className="text-foreground mb-2 text-2xl font-bold">Không tìm thấy kết quả</h3>

      <p className="text-muted-foreground max-w-md">
        {keyword ? (
          <>
            Không có kết quả nào phù hợp với từ khóa <span className="text-foreground font-semibold">“{keyword}”</span>
          </>
        ) : (
          'Vui lòng thử lại với từ khóa khác'
        )}
      </p>
    </div>
  );
};

export default SearchEmpty;
