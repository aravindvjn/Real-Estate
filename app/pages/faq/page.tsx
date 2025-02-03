'use client'
import React, { useState } from 'react';
import { faqs } from './data';


const Page = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
        <p className="mt-4 text-[16px] md:text-xl text-gray-600">
          Here are some of the most commonly asked questions about using our platform. If you can{`'`}t find an answer to your question, feel free to contact us.
        </p>
      </div>

      <div className="mt-12 max-w-lg mx-auto space-y-3 md:space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left p-6 bg-gray-200 rounded-t-lg text-[13px] sm:text-[14px] md:text-[16px] font-semibold text-gray-800 focus:outline-none"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="p-6 bg-gray-50 text-gray-600 text-[13px] sm:text-[14px] md:text-[16px]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
