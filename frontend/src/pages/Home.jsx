import React, { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5초 타임아웃
        
        const res = await fetch('http://localhost:4000/api/wedding-info', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) throw new Error('네트워크 응답 오류');
        const json = await res.json();
        setData(json);
      } catch (err) {
        // AbortError는 타임아웃을 의미
        if (err.name === 'AbortError') {
          setError('서버 연결 시간 초과. 백엔드가 실행 중인지 확인해 주세요 (localhost:4000)');
        } else {
          setError(`API 오류: ${err.message || '알 수 없는 오류'}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      // 컴포넌트 언마운트 시 fetch 중단
      controller.abort();
    };
  }, []);

  if (loading) return (
    <div className="container">
      <div className="card" style={{textAlign:'center',padding:24}}>
        <div className="small">데이터를 불러오는 중...</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container">
      <div className="card" style={{padding:24,color:'crimson'}}>
        <h3>연결 오류</h3>
        <p>{error}</p>
        <div className="small" style={{marginTop:12}}>
          • backend 폴더에서 npm run dev를 실행했는지 확인해 주세요<br/>
          • http://localhost:4000/api/wedding-info 에 접속되는지 확인해 주세요
        </div>
      </div>
    </div>
  );

  const { groom, bride, wedding } = data;

  return (
    <div className="container">
      <header className="header">
        <div className="logo" />
        <div>
          <h1 style={{margin:0}}>모바일 청첩장</h1>
          <div className="small">신랑/신부의 소중한 결혼식에 초대합니다</div>
        </div>
      </header>

      <div style={{height:12}} />

      <div className="card hero">
        <img src="/main.jpg" alt="대표 이미지" />
        <div>
          <h2 style={{marginTop:0}}>{wedding.venue}</h2>
          <div className="small">{new Date(wedding.date).toLocaleString()}</div>
          <p style={{marginTop:12}}>{wedding.address}</p>
          <button className="btn">초대장 열람</button>
        </div>
      </div>

      <div style={{height:18}} />

      <div className="grid">
        <div className="card">
          <h3>신랑</h3>
          <div className="small">{groom?.name}</div>
          <p>{groom?.intro}</p>
        </div>
        <div className="card">
          <h3>신부</h3>
          <div className="small">{bride?.name}</div>
          <p>{bride?.intro}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
