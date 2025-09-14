import React, { useEffect, useState } from 'react';
import Lightbox from '../components/Lightbox';

export default function Gallery() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/gallery')
      .then((r) => r.json())
      .then((data) => setList(data))
      .catch((e) => setError(e.message || '오류'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">로딩 중...</div>;
  if (error) return <div className="container">오류: {error}</div>;

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handlePrev = () => {
    setSelectedImage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedImage(prev => Math.min(list.length - 1, prev + 1));
  };

  return (
    <div className="container">
      <h1>갤러리</h1>
      <div className="grid gallery-grid">
        {list.map((item, index) => (
          <div 
            key={item._id || item.id} 
            className="card gallery-card"
            onClick={() => handleImageClick(index)}
          >
            <div className="img-wrap">
              <img src={item.imgUrl} alt={item.desc} />
            </div>
            <div className="gallery-desc">{item.desc}</div>
          </div>
        ))}
      </div>
      <Lightbox
        isOpen={selectedImage !== null}
        onClose={handleClose}
        imgUrl={selectedImage !== null ? list[selectedImage].imgUrl : ''}
        desc={selectedImage !== null ? list[selectedImage].desc : ''}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={selectedImage > 0}
        hasNext={selectedImage < list.length - 1}
      />
    </div>
  );
}
