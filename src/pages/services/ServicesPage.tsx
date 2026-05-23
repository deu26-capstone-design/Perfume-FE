import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { features } from './servicesData';
import './ServicesPage.css';

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
