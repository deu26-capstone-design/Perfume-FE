import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAccords } from '@entities/accords/model/accordsData';
import AccordsAbout from '@widgets/accords-about/AccordsAbout';
import SimplePerfumeGrid from '@widgets/simple-perfume-grid/SimplePerfumeGrid';
import NoteCarousel from '@widgets/note-carousel/NoteCarousel';
import type { Accord } from '@entities/accords/model/accordsType';
import './FragranceAccordsPage.css';

const AccordsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>(mockAccords[0]?.name ?? '');
  const [selectedAccord, setSelectedAccord] = useState<Accord | null>(null);

  useEffect(() => {
    const found = mockAccords.find((item) => item.name === activeCategory);

    setSelectedAccord(found ?? null);
  }, [activeCategory]);

  return (
    <div className="accords-page__container">
      <aside className="accords-page__sidebar">
        <h3 className="sidebar__title">Category</h3>

        <ul className="sidebar__list">
          {mockAccords.map((accord) => (
            <li
              key={accord.name}
              className={`sidebar__item ${activeCategory === accord.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(accord.name)}
            >
              {accord.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="accords-page__main-content">
        <AccordsAbout
          name={`About ${selectedAccord?.name ?? ''}`}
          description={selectedAccord?.description ?? ''}
          imageUrl={selectedAccord?.imageUrl ?? ''}
        />

        <section className="notes-section">
          <h3 className="section-title">Notes</h3>
          <NoteCarousel notes={selectedAccord?.notes ?? []} />
        </section>

        <section className="perfume-list-section">
          <h3 className="section-title">{selectedAccord?.name} 계열 향수</h3>

          <div className="perfume-grid-custom">
            <SimplePerfumeGrid
              perfumes={selectedAccord?.perfumes ?? []}
              onSelectPerfume={(perfume) => navigate(`/perfume/${perfume.id}`)}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AccordsPage;
