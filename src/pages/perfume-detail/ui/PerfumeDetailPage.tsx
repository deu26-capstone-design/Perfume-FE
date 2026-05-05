import PerfumeInfo from '@widgets/PerfumeInfo/ui/PerfumeInfo';
import PerfumeReviewSummary from '@widgets/PerfumeReview/ui/PerfumeReviewSummary';
import PerfumeReviewList from '@widgets/PerfumeReview/ui/PerfumeReviewList';
import { mockPerfumeDetail } from '@entities/perfume/model/detailMockData';

export default function PerfumeDetailPage() {
  return (
    <>
      <PerfumeInfo perfume={mockPerfumeDetail} />
      <PerfumeReviewSummary />
      <PerfumeReviewList />
    </>
  );
}
