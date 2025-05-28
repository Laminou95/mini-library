
interface BookStatsProps {
  stats: {
    totalBooks: number;
    totalAuthors: number;
    latestYear: number;
    oldestYear: number;
  };
}

const BookStats = ({ stats }: BookStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.totalBooks}</div>
        <div className="text-sm text-blue-800">Livres total</div>
      </div>
      
      <div className="bg-purple-50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-purple-600">{stats.totalAuthors}</div>
        <div className="text-sm text-purple-800">Auteurs</div>
      </div>
      
      {stats.totalBooks > 0 && (
        <>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.latestYear}</div>
            <div className="text-sm text-green-800">Plus récent</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.oldestYear}</div>
            <div className="text-sm text-orange-800">Plus ancien</div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookStats;
