import { Navigate, Route, Routes } from 'react-router';
import { GalleryLayout } from '../layout/GalleryLayout';
import { GalleryPage, PortfolioHealthBoard } from '../pages';
import { DistributionView } from '../views';

export const GalleryRoutes = () => {
  return (
    <GalleryLayout>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/portfolio/health" element={<PortfolioHealthBoard />} />
        <Route path="/distribution" element={<DistributionView />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </GalleryLayout>
  );
};