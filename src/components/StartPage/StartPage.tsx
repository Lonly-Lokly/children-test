import { useNavigate } from 'react-router-dom';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <button
        style={{ fontSize: 24, padding: '16px 32px', cursor: 'pointer' }}
        onClick={() => navigate('/upload')}
      >
        Начать тест
      </button>
    </div>
  );
};

export default StartPage;