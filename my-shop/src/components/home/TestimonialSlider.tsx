import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Mock testimonials - in a real app, this would come from an API
const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    rating: 5,
    text: 'I was amazed by the quality of products and the speed of delivery. The customer service was exceptional when I had questions about my order.'
  },
  {
    id: '2',
    name: 'David Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    rating: 4,
    text: 'GlobalShop has become my go-to for finding unique items from around the world. The multi-currency support makes shopping so much easier.'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    rating: 5,
    text: 'I love that I can shop in my native language and pay in my local currency. The product selection is amazing and everything arrives well-packaged.'
  }
];

const TestimonialSlider: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <img 
              src={currentTestimonial.avatar} 
              alt={currentTestimonial.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-white/50"
            />
          </div>
          <div className="flex-grow text-center md:text-left">
            <div className="flex justify-center md:justify-start text-yellow-300 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-5 w-5" 
                  fill={i < currentTestimonial.rating ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <blockquote className="text-xl italic mb-4">"{currentTestimonial.text}"</blockquote>
            <div>
              <p className="font-semibold">{currentTestimonial.name}</p>
              <p className="text-white/70">{currentTestimonial.location}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
        aria-label={t('common.previous')}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
        aria-label={t('common.next')}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default TestimonialSlider;