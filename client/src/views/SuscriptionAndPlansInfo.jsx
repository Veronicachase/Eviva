
import { useNavigate } from 'react-router-dom';

const SuscriptionAndPlansInfo= () => {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate('/payment');
  }

  return (
    <div>
      <h1>SHOWS ALL THE PRICING OPTIONS</h1>
      <button onClick={handleNavigate}>Go to Payment</button>
    </div>
  );
};

export default SuscriptionAndPlansInfo;