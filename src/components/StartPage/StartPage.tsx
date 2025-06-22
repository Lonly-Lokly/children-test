import { useNavigate } from 'react-router-dom';
import styles from './StartPage.module.scss';

const StartPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>Добро пожаловать в тест на определение типа личности!</h1>
            <button
                className={styles.startButton}
                onClick={() => navigate('/upload')}
            >
                Начать тест
            </button>
        </div>
    );
};

export default StartPage;
