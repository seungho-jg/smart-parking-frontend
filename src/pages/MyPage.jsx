import { useState, useEffect } from 'react';
import { getMyHistory } from '../api/mypage';

function MyPage() {
  const [parkingHistory, setParkingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getMyHistory();
        console.log(response);
        setParkingHistory(response.data.records);
      } catch (error) {
        setError('주차 이력을 불러오는 데 실패했습니다.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div className="text-center p-4">로딩 중...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">마이페이지 - 주차 이력</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">주차 공간</th>
              <th className="py-2 px-4 border-b">입차 시간</th>
              <th className="py-2 px-4 border-b">출차 시간</th>
              <th className="py-2 px-4 border-b">주차 요금</th>
            </tr>
          </thead>
          <tbody>
            {parkingHistory.length > 0 ? (
              parkingHistory.map((record) => (
                <tr key={record.id} className="text-center">
                  <td className="py-2 px-4 border-b">{record.spaceName}</td>
                  <td className="py-2 px-4 border-b">{new Date(record.entryTime).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{record.exitTime ? new Date(record.exitTime).toLocaleString() : '-'}</td>
                  <td className="py-2 px-4 border-b">{`${record.parkingFee.toLocaleString()}원`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">주차 이력이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyPage;