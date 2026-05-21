import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import mainPage from './assets/main-page.png';
import accordPage from './assets/accord-page.png';
import layeringPage from './assets/layering-page.png';
import './ServicesPage.css';

const features = [
  {
    label: '향수 탐색',
    title: '다양한 향수를\n한눈에 확인하세요.',
    desc: '수백 가지 향수 정보를 브랜드, 계열별로 탐색하고\n마음에 드는 향수는 위시리스트에 저장해 보세요.',
    image: mainPage,
  },
  {
    label: '향 계열 안내',
    title: '향 계열의 특징을\n쉽게 이해할 수 있어요.',
    desc: '플로럴, 우디, 시트러스 등 12가지 향 계열의\n특징과 대표 향수를 함께 소개해 드립니다.',
    image: accordPage,
  },
  {
    label: '레이어링 가이드',
    title: '나만의 시그니처 향을\n만들어 보세요.',
    desc: '두 가지 향수를 조합하는 레이어링 방법을 통해\n세상에 하나뿐인 나만의 향을 완성해 보세요.',
    image: layeringPage,
  },
  {
    label: '향 선호도 테스트',
    title: '나에게 어울리는 향을\n찾아드릴게요.',
    desc: '12가지 질문을 통해 나의 향 취향을 분석하고\n어울리는 향 계열과 향수를 추천받아 보세요.',
    image: null,
  },
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('services__feature--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    featureRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="services">
      <section className="services__hero">
        <p className="services__hero-label">The Scent Lab</p>
        <h1 className="services__hero-title">
          나만의 향을 찾아가는
          <br />
          특별한 여정을 시작하세요.
        </h1>
      </section>

      <div className="services__features">
        {features.map((f, i) => (
          <div
            key={f.label}
            ref={(el) => {
              featureRefs.current[i] = el;
            }}
            className={`services__feature ${i % 2 === 1 ? 'services__feature--reverse' : ''}`}
          >
            <div className="services__feature-visual">
              {f.image && <img src={f.image} alt={f.label} className="services__feature-img" />}
            </div>
            <div className="services__feature-text">
              <p className="services__feature-label">{f.label}</p>
              <h2 className="services__feature-title">{f.title}</h2>
              <p className="services__feature-desc">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="services__cta">
        <button className="services__cta-btn" onClick={() => navigate('/main')}>
          서비스 이용하기
        </button>
      </div>
    </div>
  );
};

export default ServicesPage;
