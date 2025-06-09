import React from 'react';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import { useReportGetting } from '../../hooks/useReportGetting';

const ReportPage: React.FC = () => {
    const taskId = useSelector((state: RootState) => state.task.taskId);
    const { status, pdfUrl, error } = useReportGetting(taskId);

    if (error) {
        return <div style={{ color: 'red', marginTop: 32 }}>{error}</div>;
    }

    if (status === 'pending') {
        return <div style={{ marginTop: 32, fontSize: 18 }}>Анализ в процессе...</div>;
    }

    if (status === 'ready' && pdfUrl) {
        return (
            <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 18, marginBottom: 16 }}>Отчет готов!</div>
                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-block',
                        marginRight: 16,
                        padding: '8px 16px',
                        background: '#1976d2',
                        color: '#fff',
                        borderRadius: 6,
                        textDecoration: 'none',
                    }}
                >
                    Просмотреть отчет
                </a>
                <a
                    href={pdfUrl}
                    download="report.pdf"
                    style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        background: '#43a047',
                        color: '#fff',
                        borderRadius: 6,
                        textDecoration: 'none',
                    }}
                >
                    Скачать отчет
                </a>
            </div>
        );
    }

    return null;
};

export default ReportPage;