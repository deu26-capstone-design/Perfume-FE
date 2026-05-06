import { useParams } from 'react-router-dom';
import PerfumeInfo from '@widgets/PerfumeInfo/ui/PerfumeInfo';
import PerfumeReviewSummary from '@widgets/PerfumeReview/ui/PerfumeReviewSummary';
import PerfumeReviewList from '@widgets/PerfumeReview/ui/PerfumeReviewList';
import { mockPerfumeDetails } from '@entities/perfume/model/detailMockData';

export default function PerfumeDetailPage() {
  const { id } = useParams();

  // API 연동 시 axios.get(`/perfumes/${id}`)로 교체
  const perfume = mockPerfumeDetails.find((p) => p.id === Number(id));

  if (!perfume) return <p>향수 정보를 찾을 수 없어요.</p>;

  return (
    <>
      <PerfumeInfo perfume={perfume} />
      <PerfumeReviewSummary />
      <PerfumeReviewList />
    </>
  );
}
