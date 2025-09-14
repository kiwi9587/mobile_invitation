import React, { useEffect, useState } from 'react';

export default function Gallery() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/gallery')
      .then((r) => r.json())
      .then((data) => setList(data))
      .catch((e) => setError(e.message || '오류'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">로딩 중...</div>;
  if (error) return <div className="container">오류: {error}</div>;

  return (
    <div className="container">
      <h1>갤러리</h1>
      <div className="grid gallery-grid">
        {list.map((item) => (
          <div key={item._id || item.id} className="card gallery-card">
            <div className="img-wrap">
              <img src={item.imgUrl} alt={item.desc} />
            </div>
            <div className="gallery-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
