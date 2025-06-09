import { forwardRef } from 'react';
import DatePickerLib from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

interface DatePickerProps {
    id?: string;
    name?: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
}

const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick, id, name }, ref) => (
    <input
        type="text"
        id={id}
        name={name}
        readOnly
        onClick={onClick}
        value={value}
        style={{
            border: '2px solid #A0A9B8',
            borderRadius: 6,
            padding: '8px 12px',
            width: '100%',
            cursor: 'pointer',
            background: '#fff',
        }}
        placeholder="Выберите дату"
        ref={ref}
        autoComplete="bdate"
    />
));

const DatePicker = ({ id = 'birthDate', name = 'birthDate', value, onChange }: DatePickerProps) => {
    return (
        <DatePickerLib
            selected={value}
            onChange={onChange}
            dateFormat="dd.MM.yyyy"
            locale={ru}
            customInput={
                <CustomInput id={id} name={name} value={value ? format(value, 'dd.MM.yyyy') : ''} />
            }
            calendarClassName="custom-calendar"
            showPopperArrow={false}
        />
    );
};

export default DatePicker;
