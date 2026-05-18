import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { accordsApi, type AccordDetail } from '@entities/accords/api/accordsApi';
import AccordsAbout from '@widgets/accords-about/AccordsAbout';
import NoteList from '@widgets/note-list/NoteList';
import AccordPerfumeList from '@widgets/accord-perfume-list/AccordPerfumeList';
import './FragranceAccordsPage.css';

const AccordsPage = () => {
  const { accordId } = useParams<{ accordId: string }>();
  const navigate = useNavigate();

  const [accordsList, setAccordsList] = useState<AccordDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const activeAccord = accordsList.find((accord) => accord.id === Number(accordId)) || null;

  useEffect(() => {
    const fetchAccords = async () => {
      try {
        const data = await accordsApi.getAccordsDetail();
        setAccordsList(data);

        if (data && data.length > 0) {
          const isValidId = data.some((a) => a.id === Number(accordId));
          if (!isValidId) {
            navigate(`/accords/${data[0].id}`, { replace: true });
          }
        }
      } catch (e) {
        console.error('향 계열 목록을 불러오는데 실패했습니다.', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccords();
  }, []);

  if (isLoading) {
    return (
      <div className="accords-loading-text">
        <p>향 계열 정보를 불러오는 중...</p>
      </div>
    );
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
              onClick={() => navigate(`/accords/${accord.id}`)}
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
