import React, { useRef, useState } from 'react';

const labels = [
  'Дом, дерево, человек',
  'Несуществующее животное',
  'Автопортрет',
];

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const UploadPage = () => {
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [previews, setPreviews] = useState<(string | null)[]>([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0] || null;

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError('Допустимые форматы: jpg, jpeg, png, pdf');
        updateFile(index, null, null);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError('Размер файла не должен превышать 5 Мб');
        updateFile(index, null, null);
        return;
      }
      if (file.type === 'application/pdf') {
        // Для PDF не показываем превью
        updateFile(index, file, null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateFile(index, file, ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      updateFile(index, null, null);
    }
  };

  function updateFile(idx: number, file: File | null, preview: string | null) {
    const newFiles = [...files];
    const newPreviews = [...previews];
    newFiles[idx] = file;
    newPreviews[idx] = preview;
    setFiles(newFiles);
    setPreviews(newPreviews);
  }

  const allFilesSelected = files.every((file) => file !== null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    files.forEach((file, idx) => {
      if (file) {
        formData.append(`file${idx + 1}`, file);
      }
    });

    try {
      const response = await fetch('https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      localStorage.setItem('task_id', data.task_id);

    } catch (err) {
      setError('Не удалось загрузить изображения. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {labels.map((label, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <label>
            {label}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              style={{ display: 'block', marginTop: 8 }}
              ref={fileInputs[idx]}
              onChange={(e) => handleFileChange(idx, e)}
              disabled={loading}
            />
          </label>
          {files[idx]?.type === 'application/pdf' && files[idx] && (
            <span style={{ fontSize: 12, color: '#555' }}>PDF выбран</span>
          )}
          {previews[idx] && files[idx]?.type !== 'application/pdf' && (
            <img
              src={previews[idx] as string}
              alt={`preview-${idx}`}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={!allFilesSelected || loading}
        style={{
          marginTop: 24,
          padding: '12px 0',
          fontSize: 18,
          background: allFilesSelected ? '#1976d2' : '#aaa',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: allFilesSelected ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s'
        }}
      >
        {loading ? 'Загрузка...' : 'Отправить фото'}
      </button>
      <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>
        Допустимые форматы: jpg, jpeg, png, pdf. Размер не более 5 Мб.
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </form>
  );
};

export default UploadPage;