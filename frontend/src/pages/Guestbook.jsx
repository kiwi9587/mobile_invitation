import React, { useEffect, useState } from 'react';

export default function Guestbook() {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const fetchList = () => {
    setLoading(true);
    fetch('http://localhost:4000/api/guestbook')
      .then((r) => r.json())
      .then((data) => setList(data))
      .catch((e) => setError(e.message || '오류'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchList();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    // 클라이언트 측 검증
    const errs = {};
    if (!name || name.trim().length === 0) errs.name = '이름을 입력해주세요.';
    else if (name.trim().length > 30) errs.name = '이름은 최대 30자입니다.';
    if (!message || message.trim().length === 0) errs.message = '메시지를 입력해주세요.';
    else if (message.trim().length > 500) errs.message = '메시지는 최대 500자입니다.';
    setFormErrors(errs);
    setSuccessMsg('');
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:4000/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() })
      });
      if (!res.ok) throw new Error('등록 실패');
      setName('');
      setMessage('');
      setSuccessMsg('방명록이 등록되었습니다.');
      fetchList();
    } catch (err) {
      setError(err.message || '오류');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container">로딩 중...</div>;
  if (error) return <div className="container">오류: {error}</div>;

  return (
    <div className="container">
      <h1>방명록</h1>

      <form className="card form-card" onSubmit={submit} noValidate>
        <div aria-live="polite" className="small" style={{minHeight:20}}>
          {successMsg && <span style={{color:'green'}}>{successMsg}</span>}
          {error && <span style={{color:'crimson'}}>{error}</span>}
        </div>

        <label className="label">이름</label>
        <input
          className="input"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={!!formErrors.name}
          aria-describedby={formErrors.name ? 'err-name' : undefined}
          disabled={submitting}
        />
        {formErrors.name && <div id="err-name" style={{color:'crimson'}}>{formErrors.name}</div>}

        <label className="label">메시지</label>
        <textarea
          className="textarea"
          placeholder="메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!formErrors.message}
          aria-describedby={formErrors.message ? 'err-message' : undefined}
          disabled={submitting}
        />
        {formErrors.message && <div id="err-message" style={{color:'crimson'}}>{formErrors.message}</div>}

        <div style={{ textAlign: 'right' }}>
          <button className="btn" type="submit" disabled={submitting}>{submitting ? '등록 중...' : '등록'}</button>
        </div>
      </form>

      <div style={{ marginTop: 12 }}>
        {list.map((item) => (
          <div key={item._id || item.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{item.name}</strong>
              <small>{new Date(item.createdAt).toLocaleString()}</small>
            </div>
            <p style={{ marginTop: 8 }}>{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
