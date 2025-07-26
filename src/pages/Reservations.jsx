import { useLocation, useNavigate } from 'react-router-dom';
import { reserveParkingSpace } from '../api/parking';

function Reservations() {
  const location = useLocation();
  const navigate = useNavigate();
  const { spaceId, spaceName } = location.state || {};

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const result = await reserveParkingSpace(spaceId);
      if(result.success) {
        alert(`${spaceName} 공간이 예약되었습니다.`);
      }
        alert(error.message ||  '예약에 실패했습니다.');
      navigate('/');
    } catch (error) {
      alert(error.message ||  '예약에 실패했습니다.');
    }

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">주차 예약</h1>
      {spaceId ? (
        <form onSubmit={handleReservation} className="max-w-md mx-auto">
          <div className="mb-4">
            <p className="text-lg">선택한 주차 공간: <strong>{spaceName}</strong></p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            예약 확정
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p>예약할 주차 공간을 먼저 선택해주세요.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            주차 현황으로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}

export default Reservations;