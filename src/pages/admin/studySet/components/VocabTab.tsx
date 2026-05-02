import { VocabTerm } from '@/interface/studySet';

interface VocabTabProps {
  items: VocabTerm[];
}

const VocabTab = ({ items }: VocabTabProps) => {
  return (
    <div className="animate-fadeIn">
      <h3 className="mb-4 text-lg font-bold">Danh sách từ vựng</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left font-medium">STT</th>
              <th className="px-4 py-3 text-left font-medium">Từ</th>
              <th className="px-4 py-3 text-left font-medium">Nghĩa</th>
              <th className="px-4 py-3 text-left font-medium">Ghi chú</th>
              <th className="px-4 py-3 text-left font-medium">Đã xóa</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items
                .sort((a, b) => a.position - b.position)
                .map((item, index) => (
                  <tr key={item.id} className="hover:bg-muted/50 border-b">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.word}</td>
                    <td className="px-4 py-3">{item.meaning}</td>
                    <td className="px-4 py-3">{item.note || '-'}</td>
                    <td className="px-4 py-3">{item.isDeleted ? 'Đã xóa' : 'Chưa xóa'}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Không có từ vựng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VocabTab;
