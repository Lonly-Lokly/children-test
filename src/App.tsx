import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import UploadPage from './Pages/UploadPage/UploadPage';
import SurveyPage from './Pages/SurveyPage/SurveyPage';
import ResultPage from './Pages/ResultPage/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Главная</Link> |{' '}
        <Link to="/upload">Загрузка</Link> |{' '}
        <Link to="/survey">Опрос</Link> |{' '}
        <Link to="/result">Результат</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;