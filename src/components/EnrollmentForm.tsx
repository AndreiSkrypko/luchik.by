import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EnrollmentForm.module.css';

interface EnrollmentFormProps {
  onSuccess?: () => void;
  courseName?: string;
  compact?: boolean;
}

// Валидация белорусского номера: +375 XX XXX-XX-XX (12 цифр: 375 + 9)
const validateBelarusPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.startsWith('375') && digits.length === 12;
};

const EnrollmentForm = ({ onSuccess, courseName = 'подготовку к школе', compact = false }: EnrollmentFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    parentPhone: '',
    message: ''
  });
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'parentPhone') {
      setPhoneError(value ? (validateBelarusPhone(value) ? '' : 'Введите номер в формате +375 (XX) XXX-XX-XX') : '');
    }
  };

  const sendToTelegram = async (data: typeof formData) => {
    const BOT_TOKEN = '8521779588:AAGekE0xiI-1b0ikAFJ10LSIW2t25JXtK3A';
    const CHAT_ID = '1349417673';
    
    // Форматируем дату рождения для читаемости
    const formattedDate = data.dateOfBirth 
      ? new Date(data.dateOfBirth).toLocaleDateString('ru-RU', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Не указана';

    const message = `🎓 <b>Новая заявка на ${courseName}</b>\n\n` +
      `📚 <b>Курс:</b> ${courseName}\n` +
      `👤 <b>Имя и фамилия ребёнка:</b> ${data.fullName}\n` +
      `📅 <b>Дата рождения:</b> ${formattedDate}\n` +
      `📱 <b>Номер опекуна/родителя:</b> ${data.parentPhone}\n` +
      (data.message ? `💬 <b>Дополнительная информация:</b>\n${data.message}` : '');

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки сообщения');
      }

      return true;
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBelarusPhone(formData.parentPhone)) {
      setPhoneError('Введите номер в формате +375 (XX) XXX-XX-XX');
      return;
    }
    setPhoneError('');
    setIsSubmitting(true);
    
    try {
      await sendToTelegram(formData);
      
      // Отслеживание конверсии - заполнение формы
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-18090541332',
          'event_category': 'form',
          'event_label': 'enrollment_form_submit',
          'value': 1.0,
          'currency': 'BYN'
        });
      }
      
      // Очищаем форму
      setFormData({
        fullName: '',
        dateOfBirth: '',
        parentPhone: '',
        message: ''
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        // Перенаправляем на страницу благодарности для отслеживания конверсий
        navigate('/thank-you');
      }
    } catch (error) {
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`${styles.enrollmentForm} ${compact ? styles.compactForm : ''}`} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="fullName" className={styles.formLabel}>
          Имя и фамилия ребёнка *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={styles.formInput}
          required
          placeholder="Введите имя и фамилию"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dateOfBirth" className={styles.formLabel}>
          Дата рождения *
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className={styles.formInput}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="parentPhone" className={styles.formLabel}>
          Номер опекуна или родителя *
        </label>
        <input
          type="tel"
          id="parentPhone"
          name="parentPhone"
          value={formData.parentPhone}
          onChange={handleChange}
          onBlur={() => formData.parentPhone && setPhoneError(validateBelarusPhone(formData.parentPhone) ? '' : 'Введите номер в формате +375 (XX) XXX-XX-XX')}
          className={`${styles.formInput} ${phoneError ? styles.formInputError : ''}`}
          required
          placeholder="+375 (XX) XXX-XX-XX"
          aria-invalid={!!phoneError}
          aria-describedby={phoneError ? 'parentPhone-error' : undefined}
        />
        {phoneError && <span id="parentPhone-error" className={styles.formError} role="alert">{phoneError}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.formLabel}>
          Дополнительная информация
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={styles.formTextarea}
          rows={compact ? 3 : 4}
          placeholder="Расскажите о ваших пожеланиях или вопросах"
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
};

export default EnrollmentForm;
