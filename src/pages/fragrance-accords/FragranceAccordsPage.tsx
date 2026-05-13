import { useState, useEffect } from 'react';
import { accordsApi, type AccordDetail } from '@entities/accords/api/accordsApi';
import AccordsAbout from '@widgets/accords-about/AccordsAbout';
import NoteList from '@widgets/note-list/NoteList';
import AccordPerfumeList from '@widgets/accord-perfume-list/AccordPerfumeList';
import './FragranceAccordsPage.css';

const AccordsPage = () => {
  const [accordsList, setAccordsList] = useState<AccordDetail[]>([]);
  const [activeAccord, setActiveAccord] = useState<AccordDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccords = async () => {
      try {
        console.log('API 호출 시작');

        const data = await accordsApi.getAccordsDetail();

        console.log('응답 성공');
        console.log(data);

        setAccordsList(data);

        if (data && data.length > 0) {
          setActiveAccord(data[0]);
        }
      } catch (e) {
        console.error('에러 발생');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccords();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!activeAccord) {
    return <div>존재하는 향 계열 데이터가 없습니다.</div>;
  }

  return (
    <div className="accords-page__container">
      <aside className="accords-page__sidebar">
        <h3 className="sidebar__title">Category</h3>
        <ul className="sidebar__list">
          {accordsList.map((accord) => (
            <li
              key={accord.id}
              className={`sidebar__item ${activeAccord.id === accord.id ? 'active' : ''}`}
              onClick={() => setActiveAccord(accord)}
            >
              {accord.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="accords-page__main-content">
        <AccordsContent accord={activeAccord} />
      </main>
    </div>
  );
};

const AccordsContent = ({ accord }: { accord: AccordDetail }) => {
  return (
    <>
      <AccordsAbout
        name={`About ${accord.name}`}
        description={accord.description}
        imageUrl={accord.imageUrl}
      />

      <section className="notes-section">
        <h3 className="section-title">Notes</h3>
        <NoteList accordId={accord.id} />
      </section>

      <section className="perfume-list-section">
        <h3 className="section-title">{accord.name} 계열 향수</h3>
        <div className="perfume-grid-custom">
          <AccordPerfumeList accordId={accord.id} />
        </div>
      </section>
    </>
  );
};

export default AccordsPage;
