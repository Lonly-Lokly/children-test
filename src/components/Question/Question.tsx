import React from 'react';

interface QuestionProps {
    title: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const options = [
    { value: '1', label: 'Очень редко' },
    { value: '2', label: 'Редко' },
    { value: '3', label: 'Иногда' },
    { value: '4', label: 'Часто' },
    { value: '5', label: 'Всегда' },
];

const Question: React.FC<QuestionProps> = ({ title, name, value, onChange }) => (
    <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 8 }}>{title}</div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {options.map((option) => (
                <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    </div>
);

export default Question;
