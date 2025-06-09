import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store';
import DatePicker from '../../components/DatePicker/DatePicker';
import CustomTextareaAutosize from '../../components/CustomTextareaAutosize/CustomTextareaAutosize';
import Question from '../../components/Question/Question';
import { useSurveyForm } from '../../hooks/useSurveyForm';

type FormType = typeof initialForm;

const initialForm = {
    childName: '',
    gender: 'male',
    birthDate: null as Date | null,
    parentName: '',
    emotionalState: '',
    features: '',
    strengths: '',
    areas: '',
    specialists: '',
    // Раздел 1
    emotion1: '',
    emotion2: '',
    emotion3: '',
    emotion4: '',
    // Раздел 2
    social1: '',
    social2: '',
    social3: '',
    social4: '',
    // Раздел 3
    behavior1: '',
    behavior2: '',
    behavior3: '',
    behavior4: '',
    // Раздел 4
    selfesteem1: '',
    selfesteem2: '',
    selfesteem3: '',
    selfesteem4: '',
};

const SurveyPage = () => {
    const navigate = useNavigate();

    const taskId = useSelector((state: RootState) => state.task.taskId);
    const { form, setForm, handleChange, handleDateChange, handleSubmit, loading } =
        useSurveyForm<FormType>({
            initialForm,
            taskId,
            onSuccess: () => navigate('/report'),
            onError: (err) => alert('Ошибка отправки: ' + err),
        });

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <h2>Общая информация о ребенке</h2>
            <div style={{ marginBottom: 16 }}>
                <label htmlFor="childName">
                    Имя ребенка
                    <br />
                    <input
                        type="text"
                        id="childName"
                        name="childName"
                        value={form.childName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 4 }}>Пол ребенка</div>
                <div style={{ display: 'flex', gap: 24 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="gender"
                            id="gender-male"
                            value="male"
                            checked={form.gender === 'male'}
                            onChange={handleChange}
                        />
                        муж
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="gender"
                            id="gender-female"
                            value="female"
                            checked={form.gender === 'female'}
                            onChange={handleChange}
                        />
                        жен
                    </label>
                </div>
            </div>

            <div style={{ marginBottom: 24 }}>
                <label htmlFor="birthDate" style={{ display: 'block', marginBottom: 4 }}>
                    Дата рождения ребенка
                </label>
                <DatePicker
                    id="birthDate"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleDateChange}
                />
            </div>

            <div style={{ marginBottom: 24 }}>
                <label htmlFor="parentName">
                    Имя родителя, заполняющего анкету
                    <br />
                    <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={form.parentName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: 8, fontSize: 15 }}>
                Пожалуйста, внимательно прочитайте каждый вопрос и выберите наиболее подходящий
                вариант ответа, отражающий поведение и эмоциональное состояние вашего ребенка в
                течение последних 2-4 недель. Отвечайте максимально честно и искренне, так как от
                этого зависит точность оценки психоэмоционального развития Вашего ребенка.
            </div>
            <div style={{ marginBottom: 24, fontWeight: 500 }}>
                Все вопросы обязательны к заполнению.
            </div>

            <div style={{ marginBottom: 8, fontWeight: 600 }}>Раздел 1. Эмоциональная сфера</div>
            <Question
                title="Ребенок часто выражает радость и удовольствие:"
                name="emotion1"
                value={form.emotion1}
                onChange={handleChange}
            />
            <Question
                title="Ребенок часто выражает радость и удовольствие:"
                name="emotion2"
                value={form.emotion2}
                onChange={handleChange}
            />
            <Question
                title="Ребенок часто выражает радость и удовольствие:"
                name="emotion3"
                value={form.emotion3}
                onChange={handleChange}
            />
            <Question
                title="Ребенок часто выражает радость и удовольствие:"
                name="emotion4"
                value={form.emotion4}
                onChange={handleChange}
            />

            <div style={{ marginBottom: 8, fontWeight: 600 }}>
                Раздел 2. Социальное взаимодействие
            </div>
            <Question
                title="Ребенок легко заводит друзей:"
                name="social1"
                value={form.social1}
                onChange={handleChange}
            />
            <Question
                title="Ребенок умеет делиться игрушками и вещами:"
                name="social2"
                value={form.social2}
                onChange={handleChange}
            />
            <Question
                title="Ребенок проявляет инициативу в общении:"
                name="social3"
                value={form.social3}
                onChange={handleChange}
            />
            <Question
                title="Ребенок уважает правила в коллективе:"
                name="social4"
                value={form.social4}
                onChange={handleChange}
            />

            <div style={{ marginBottom: 8, fontWeight: 600 }}>
                Раздел 3. Саморегуляция и поведение
            </div>
            <Question
                title="Ребенок может спокойно ждать своей очереди:"
                name="behavior1"
                value={form.behavior1}
                onChange={handleChange}
            />
            <Question
                title="Ребенок умеет контролировать свои эмоции:"
                name="behavior2"
                value={form.behavior2}
                onChange={handleChange}
            />
            <Question
                title="Ребенок выполняет просьбы взрослых с первого раза:"
                name="behavior3"
                value={form.behavior3}
                onChange={handleChange}
            />
            <Question
                title="Ребенок не проявляет агрессию по отношению к другим:"
                name="behavior4"
                value={form.behavior4}
                onChange={handleChange}
            />

            <div style={{ marginBottom: 8, fontWeight: 600 }}>
                Раздел 4. Самооценка и уверенность в себе
            </div>
            <Question
                title="Ребенок уверен в своих силах:"
                name="selfesteem1"
                value={form.selfesteem1}
                onChange={handleChange}
            />
            <Question
                title="Ребенок не боится пробовать новое:"
                name="selfesteem2"
                value={form.selfesteem2}
                onChange={handleChange}
            />
            <Question
                title="Ребенок положительно отзывается о себе:"
                name="selfesteem3"
                value={form.selfesteem3}
                onChange={handleChange}
            />
            <Question
                title="Ребенок спокойно относится к неудачам:"
                name="selfesteem4"
                value={form.selfesteem4}
                onChange={handleChange}
            />

            <div style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 8 }}>
                    Как Вы оцениваете общее эмоциональное состояние вашего ребенка?
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="emotionalState"
                            value="excellent"
                            checked={form.emotionalState === 'excellent'}
                            onChange={handleChange}
                        />
                        Отличное
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="emotionalState"
                            value="good"
                            checked={form.emotionalState === 'good'}
                            onChange={handleChange}
                        />
                        Хорошее
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="emotionalState"
                            value="satisfactory"
                            checked={form.emotionalState === 'satisfactory'}
                            onChange={handleChange}
                        />
                        Удовлетворительное
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="emotionalState"
                            value="unsatisfactory"
                            checked={form.emotionalState === 'unsatisfactory'}
                            onChange={handleChange}
                        />
                        Неудовлетворительное
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input
                            type="radio"
                            name="emotionalState"
                            value="very_bad"
                            checked={form.emotionalState === 'very_bad'}
                            onChange={handleChange}
                        />
                        Очень плохое
                    </label>
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <label htmlFor="features">
                    Есть ли у Вашего ребенка какие-либо особенности развития или поведения, о
                    которых Вы хотели бы сообщить дополнительно?
                    <br />
                    <CustomTextareaAutosize
                        value={form.features}
                        onChange={(e) =>
                            setForm((f: FormType) => ({ ...f, features: e.target.value }))
                        }
                        name="features"
                        id="features"
                    />
                </label>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label htmlFor="strengths">
                    Какие, на Ваш взгляд, сильные стороны и таланты есть у Вашего ребенка?
                    <br />
                    <CustomTextareaAutosize
                        value={form.strengths}
                        onChange={(e) =>
                            setForm((f: FormType) => ({ ...f, strengths: e.target.value }))
                        }
                        name="strengths"
                        id="strengths"
                    />
                </label>
            </div>
            <div style={{ marginBottom: 20 }}>
                <label htmlFor="areas">
                    Какие, на Ваш взгляд, области требуют особого внимания и развития у Вашего
                    ребенка?
                    <br />
                    <CustomTextareaAutosize
                        value={form.areas}
                        onChange={(e) =>
                            setForm((f: FormType) => ({ ...f, areas: e.target.value }))
                        }
                        name="areas"
                        id="areas"
                    />
                </label>
            </div>
            <div style={{ marginBottom: 32 }}>
                <label htmlFor="specialists">
                    Обращались ли Вы ранее к специалистам (психологу, неврологу, логопеду) по поводу
                    развития или поведения Вашего ребенка?
                    <br />
                    <CustomTextareaAutosize
                        value={form.specialists}
                        onChange={(e) =>
                            setForm((f: FormType) => ({ ...f, specialists: e.target.value }))
                        }
                        name="specialists"
                        id="specialists"
                    />
                </label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontWeight: 500 }}>Шаг 2/3</span>
                <button
                    type="button"
                    onClick={() => navigate('/upload')}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        border: '1px solid #1976d2',
                        background: '#fff',
                        color: '#1976d2',
                        cursor: 'pointer',
                    }}
                >
                    К загрузке рисунков
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 6,
                        border: 'none',
                        background: '#1976d2',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    {loading ? 'Отправка...' : 'Отправить опрос'}
                </button>
            </div>
        </form>
    );
};

export default SurveyPage;
