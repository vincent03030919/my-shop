import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Star, TrendingUp, Globe, Truck, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/Button';
import FeaturedProducts from '../components/products/FeaturedProducts';
import CategoryGrid from '../components/products/CategoryGrid';
import TestimonialSlider from '../components/home/TestimonialSlider';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('home.hero.title', 'Shop Globally, Delivered Locally')}
            </h1>
            <p className="text-xl mb-8">
              {t('home.hero.subtitle', 'Discover unique products from around the world with secure payment and fast shipping.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="font-semibold">
                  {t('home.hero.shopNow', 'Shop Now')}
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-semibold">
                  {t('home.hero.browseCategories', 'Browse Categories')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.features.title', 'Why Choose GlobalShop')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.global.title', 'Global Selection')}</h3>
              <p className="text-gray-600">
                {t('home.features.global.description', 'Access to unique products from over 100 countries around the world.')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.shipping.title', 'Fast Shipping')}</h3>
              <p className="text-gray-600">
                {t('home.features.shipping.description', 'Quick and reliable shipping with real-time package tracking.')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('home.features.payment.title', 'Secure Payments')}</h3>
              <p className="text-gray-600">
                {t('home.features.payment.description', 'Multiple payment options with advanced security and fraud protection.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.categories.title', 'Shop by Category')}
          </h2>
          <CategoryGrid />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {t('home.featuredProducts.title', 'Featured Products')}
            </h2>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('home.featuredProducts.viewAll', 'View All')} →
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <TrendingUp className="h-8 w-8 mr-2 text-blue-600" />
              {t('home.trendingProducts.title', 'Trending Now')}
            </h2>
            <Link to="/products?sort=trending" className="text-blue-600 hover:text-blue-800 font-medium">
              {t('home.trendingProducts.viewAll', 'View All')} →
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('home.testimonials.title', 'What Our Customers Say')}
          </h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t('home.newsletter.title', 'Subscribe to Our Newsletter')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('home.newsletter.description', 'Stay updated with the latest products, exclusive offers, and discounts.')}
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={t('home.newsletter.emailPlaceholder', 'Your email address')}
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button type="submit">
                {t('home.newsletter.subscribe', 'Subscribe')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;