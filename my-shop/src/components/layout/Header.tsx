import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Globe, 
  ChevronDown,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' }
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' }
];

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItems } = useCartStore();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  const toggleCurrencyMenu = () => setIsCurrencyMenuOpen(!isCurrencyMenuOpen);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLanguageMenuOpen(false);
    
    if (user) {
      // In a real app, you would update the user's preferences in the backend
      useAuthStore.getState().updateUserPreferences(lng, user.currency);
    }
  };
  
  const changeCurrency = (currency: string) => {
    useCartStore.getState().setCurrency(currency);
    setIsCurrencyMenuOpen(false);
    
    if (user) {
      // In a real app, you would update the user's preferences in the backend
      useAuthStore.getState().updateUserPreferences(user.language, currency);
    }
  };
  
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            GlobalShop
          </Link>
          
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder={t('common.search')}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <Globe className="h-5 w-5 mr-1" />
                <span>{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={toggleCurrencyMenu}
                className="flex items-center text-gray-700 hover:text-blue-600"
              >
                <span>{currencies.find(c => c.code === useCartStore.getState().currency)?.symbol || '$'}</span>
                <span className="ml-1">{useCartStore.getState().currency}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              
              {isCurrencyMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => changeCurrency(currency.code)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <span>{currency.symbol} {currency.code}</span>
                        <span className="ml-2 text-gray-500">{currency.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <User className="h-6 w-6" />
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('common.account')}
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('common.orders')}
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {t('common.settings')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {t('common.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    {t('common.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    {t('common.register')}
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('common.search')}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-4 py-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.products')}
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.categories')}
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-blue-600 py-2 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {t('common.cart')}
                {getTotalItems() > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{t('common.language')}</span>
                  <select
                    value={i18n.language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md px-2 py-1"
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-700">{t('common.currency')}</span>
                  <select
                    value={useCartStore.getState().currency}
                    onChange={(e) => changeCurrency(e.target.value)}
                    className="bg-white border border-gray-300 rounded-md px-2 py-1"
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.symbol} {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {isAuthenticated ? (
                <div className="border-t border-gray-200 pt-4">
                  <Link
                    to="/account"
                    className="text-gray-700 hover:text-blue-600 py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common.account')}
                  </Link>
                  <Link
                    to="/orders"
                    className="text-gray-700 hover:text-blue-600 py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common.orders')}
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 hover:text-blue-600 py-2 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common.settings')}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-blue-600 py-2 flex items-center w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('common.logout')}
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      {t('common.login')}
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">
                      {t('common.register')}
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
      
      {/* Categories Navigation */}
      <div className="hidden md:block bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8 py-2">
            <Link to="/" className="text-gray-700 hover:text-blue-600">
              {t('common.home')}
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              {t('common.products')}
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600">
              {t('common.categories')}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">
              {t('common.about')}
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">
              {t('common.contact')}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};