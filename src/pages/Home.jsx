import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getParkingSpaces } from '../api/parking';

const FLOORS = [1, 2, 3];
const SPACES_PER_ROW = 4;

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(FLOORS[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getParkingSpaces();
        setParkingSpaces(response.data);
      } catch (error) {
        setError('주차 정보를 불러오는 데 실패했습니다.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchdata();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500 hover:bg-green-600';
      case 'occupied':
        return 'bg-red-500 cursor-not-allowed';
      case 'reserved':
        return 'bg-yellow-500 cursor-not-allowed';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSpaceClick = (space) => {
    if (space.status === 'available') {
      navigate('/reservations', { state: { spaceId: space.id, spaceName: space.name } });
    }
  };

  const renderParkingSpaces = (floor) => {
    const floorSpaces = parkingSpaces.filter((space) => space.floor === floor);
    const rows = [];
    for (let i = 0; i < floorSpaces.length; i += SPACES_PER_ROW) {
      rows.push(floorSpaces.slice(i, i + SPACES_PER_ROW));
    }

    if (loading) return <div className="text-center p-4">로딩 중...</div>;
    if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center items-center my-5">
        {row.map((space) => (
          <div
            key={space.id}
            className={`w-16 h-24 m-1 flex flex-col items-center justify-center rounded-lg text-white transition-colors ${getStatusColor(space.status)} ${
              space.status === 'available' ? 'cursor-pointer' : ''
            }`}
            onClick={() => handleSpaceClick(space)}
          >
            <span className="text-sm font-semibold">{space.name}</span>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">실시간 주차 현황</h1>

      <div className="flex justify-center mb-4">
        {FLOORS.map((floor) => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(floor)}
            className={`px-4 py-2 mx-2 rounded-md transition-colors ${
              selectedFloor === floor
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {`${floor}층`}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex flex-col items-center">
          {renderParkingSpaces(selectedFloor)}
        </div>
      </div>
    </div>
  );
}

export default Home;
