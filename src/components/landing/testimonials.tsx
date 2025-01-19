'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote:
      "GimmeDoc has transformed our startup's legal process. We save hours on document creation every week!",
    author: 'Alex Johnson',
    position: 'CEO, TechStart',
    companyLogo: '/webflow-logo.png',
  },
  {
    id: 2,
    quote:
      "The platform simplified our legal documentation workflow. It's a game-changer for startups!",
    author: 'Sarah Chen',
    position: 'Founder, InnovateLab',
    companyLogo: '/webflow-logo.png',
  },
  {
    id: 3,
    quote:
      'Finally, a legal solution that speaks our language. GimmeDoc makes contracts less intimidating.',
    author: 'Michael Ross',
    position: 'CTO, DevStack',
    companyLogo: '/webflow-logo.png',
  },
]

export function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          {/* Testimonials */}
          <div className="testimonial-carousel relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-slide w-full">
                  <div className="flex flex-col items-center">
                    <Image
                      src={testimonial.companyLogo}
                      alt="Company logo"
                      width={120}
                      height={40}
                      className="mb-12"
                    />
                    <blockquote className="max-w-3xl text-center text-4xl font-medium leading-tight text-white">
                      &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <div className="mt-8 flex items-center">
                      <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-600">
                        {/* Avatar placeholder */}
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-semibold text-white">{testimonial.author}</div>
                        <div className="text-sm text-gray-400">{testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="mt-12 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-primary' : 'bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="testimonial-progress mt-8">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentSlide + 1) / testimonials.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
