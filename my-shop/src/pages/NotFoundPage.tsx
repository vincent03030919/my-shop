import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-16">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">
          {t('error.pageNotFound', 'Page Not Found')}
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          {t('error.pageNotFoundMessage', "We're sorry, the page you requested could not be found. Please check the URL or try navigating to our homepage.")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto" leftIcon={<Home className="h-4 w-4" />}>
              {t('common.backToHome', 'Back to Home')}
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className="w-full sm:w-auto" leftIcon={<Search className="h-4 w-4" />}>
              {t('common.browseProducts', 'Browse Products')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;