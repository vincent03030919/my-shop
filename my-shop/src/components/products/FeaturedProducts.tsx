import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/useCartStore';

// Mock data - in a real app, this would come from an API
const mockProducts = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 199.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Electronics',
    stock: 50,
    rating: 4.8,
    reviews: []
  },
  {
    id: '2',
    title: 'Handcrafted Leather Wallet',
    description: 'Genuine leather with multiple card slots',
    price: 59.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Accessories',
    stock: 100,
    rating: 4.5,
    reviews: []
  },
  {
    id: '3',
    title: 'Smart Fitness Tracker',
    description: 'Track your health and fitness goals',
    price: 129.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Electronics',
    stock: 75,
    rating: 4.7,
    reviews: []
  },
  {
    id: '4',
    title: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly',
    price: 29.99,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'],
    category: 'Clothing',
    stock: 200,
    rating: 4.3,
    reviews: []
  }
];

const FeaturedProducts: React.FC = () => {
  const { t } = useTranslation();
  const { addItem, currency } = useCartStore();

  // In a real app, you would convert prices based on the selected currency
  const formatPrice = (price: number, productCurrency: string) => {
    // This is a simplified example - in a real app, you would use a currency conversion API
    if (currency === productCurrency) {
      return `${getCurrencySymbol(currency)}${price.toFixed(2)}`;
    }
    
    // Mock conversion rates
    const rates = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110,
      CNY: 6.5
    };
    
    const convertedPrice = price * (rates[currency as keyof typeof rates] / rates[productCurrency as keyof typeof rates]);
    return `${getCurrencySymbol(currency)}${convertedPrice.toFixed(2)}`;
  };
  
  const getCurrencySymbol = (currencyCode: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CNY: '¥'
    };
    
    return symbols[currencyCode] || currencyCode;
  };

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addItem(product, 1);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <Link to={`/products/${product.id}`} className="block">
            <div className="h-64 overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link to={`/products/${product.id}`} className="block">
              <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors">{product.title}</h3>
            </Link>
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-4 w-4" 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">
                {formatPrice(product.price, product.currency)}
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleAddToCart(product)}
                className="flex items-center"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                {t('product.addToCart')}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;