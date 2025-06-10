import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import UploadPage from './Pages/UploadPage/UploadPage';
import SurveyPage from './Pages/SurveyPage/SurveyPage';
import ReportPage from './Pages/ReportPage/ReportPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/report" element={<ReportPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
