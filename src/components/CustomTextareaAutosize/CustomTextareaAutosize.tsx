import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface CustomTextareaAutosizeProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name?: string;
    id?: string;
    placeholder?: string;
    minRows?: number;
}

const CustomTextareaAutosize: React.FC<CustomTextareaAutosizeProps> = ({
    value,
    onChange,
    name,
    id,
    placeholder = 'Введите текст',
    minRows = 3,
}) => (
    <TextareaAutosize
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        minRows={minRows}
        placeholder={placeholder}
        style={{ resize: 'none' }}
    />
);

export default CustomTextareaAutosize;
