import { useState } from 'react';

interface UseSurveyFormOptions<T> {
    initialForm: T;
    taskId: string | null;
    onSuccess?: () => void;
    onError?: (error: any) => void;
}

export function useSurveyForm<T extends Record<string, any>>({
    initialForm,
    taskId,
    onSuccess,
    onError,
}: UseSurveyFormOptions<T>) {
    const [form, setForm] = useState<T>(initialForm);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setForm((prev) => ({
            ...prev,
            birthDate: date,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskId) {
            onError?.('Не найден task_id. Сначала загрузите изображения.');
            return;
        }
        setLoading(true);
        try {
            const survey: Record<string, any> = {
                childName: form.childName,
                childDOB: form.birthDate
                    ? typeof form.birthDate === 'string'
                        ? form.birthDate
                        : (form.birthDate as Date).toISOString().split('T')[0]
                    : null,
                childGender: form.gender,
                parentName: form.parentName,
                emotionalState: form.emotionalState,
            };

            for (let section = 1; section <= 4; section++) {
                for (let i = 1; i <= 10; i++) {
                    const key = `q${section}_${i}`;
                    survey[key] = form[key] || '';
                }
            }

            const response = await fetch(
                'https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        survey,
                        task_id: taskId,
                    }),
                },
            );
            if (!response.ok) throw new Error('Ошибка отправки формы');
            onSuccess?.();
        } catch (error) {
            onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    return { form, setForm, handleChange, handleDateChange, handleSubmit, loading };
}
