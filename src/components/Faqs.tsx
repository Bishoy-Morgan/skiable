'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import arrow from '@/public/icons/arrow.svg'; 

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: 'How does Skiable find the best flight deals?',
    answer:
      'Skiable compares ticket prices from hundreds of airlines and travel sites to help you find the best and most affordable flight options quickly.',
  },
  {
    question: 'Can I book flights directly through Skiable?',
    answer:
      'No, Skiable redirects you to the airline or travel agency website where you can complete your booking.',
  },
  {
    question: 'Is Skiable free to use?',
    answer:
      'Yes, Skiable is completely free to use. It helps you explore and compare flights without any additional cost.',
  },
  {
    question: 'Can I track flight prices?',
    answer:
      'Yes, Skiable lets you track flight prices. You’ll receive email alerts if the prices change.',
  },
  {
    question: 'Does Skiable show all airlines?',
    answer:
      'While it shows most major airlines, some budget or regional airlines may not be included due to data-sharing limitations.',
  },
];

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  return (
    <section className="w-[90%] 2xl:w-4/5 mx-auto py-12">
      <h2 className="mb-10 text-black max-w-3xl">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-[#F5F3ED] p-8 rounded-xl transition duration-300  "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <p className="main-para font-semibold mb-2">{faq.question}</p>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }} 
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={arrow}
                  alt="Arrow"
                  width={30} 
                  height={30} 
                  className="text-xl"
                />
              </motion.div>
            </div>
            {openIndex === index && (
              <motion.div
                className="text-black mt-4"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className='para-14'>{faq.answer}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faqs;
