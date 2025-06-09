import { useEffect, useState } from 'react';

export function useReportGetting(taskId: string | null) {
    const [status, setStatus] = useState<'pending' | 'ready' | 'error'>('pending');
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!taskId) {
            setError('Не найден task_id');
            return;
        }

        let interval: number;

        const fetchStatus = async () => {
            try {
                const res = await fetch(
                    `/report/${taskId}`,
                );
                if (!res.ok) {
                    // Если 500, продолжаем polling, иначе ошибка
                    if (res.status === 500) {
                        setStatus('pending');
                        return;
                    }
                    throw new Error('Ошибка получения статуса отчета');
                }
                const data = await res.json();
                if (data.status === 'ready' && data.pdf_url) {
                    setStatus('ready');
                    setPdfUrl(data.pdf_url);
                    clearInterval(interval);
                } else if (data.status === 'pending') {
                    setStatus('pending');
                } else {
                    setStatus('error');
                    setError('Не удалось получить отчет');
                    
                }
            } catch (e) {
                setStatus('error');
                setError('Ошибка сети или сервера');
                
            }
        };

        fetchStatus();
        interval = window.setInterval(fetchStatus, 10000);

        return () => clearInterval(interval);
    }, [taskId]);

    return { status, pdfUrl, error };
}