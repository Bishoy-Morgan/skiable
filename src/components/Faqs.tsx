'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
      'Skiable compares ticket prices from hundreds of airlines and travel sites to help you find the best and most affordable flight options quickly. Our advanced algorithms analyze millions of data points in real time, taking into account factors such as seasonality, demand, and historical pricing trends. This ensures that you always see the most up-to-date and competitive fares available, saving you both time and money on your next trip.',
  },
  {
    question: 'Can I book flights directly through Skiable?',
    answer:
      'No, Skiable redirects you to the airline or travel agency website where you can complete your booking. This approach allows you to book directly with the provider, ensuring transparency and access to the latest deals and policies. We do not charge any additional fees for this service, and you can rest assured that your booking is handled securely by the airline or travel agency of your choice.',
  },
  {
    question: 'Is Skiable free to use?',
    answer:
      'Yes, Skiable is completely free to use. It helps you explore and compare flights without any additional cost. Our platform is supported by partnerships with airlines and travel agencies, which means you never pay extra for using our search tools. You can browse, compare, and track flights as much as you like, all without worrying about hidden fees or subscription charges.',
  },
  {
    question: 'Can I track flight prices?',
    answer:
      'Yes, Skiable lets you track flight prices. You’ll receive email alerts if the prices change. Simply select the flights or routes you are interested in, and we will monitor them for you. Whenever there is a significant price drop or increase, you will be notified immediately, allowing you to book at the optimal time and maximize your savings.',
  },
  {
    question: 'Does Skiable show all airlines?',
    answer:
      'While it shows most major airlines, some budget or regional airlines may not be included due to data-sharing limitations. We are constantly working to expand our coverage and include as many airlines as possible. If you do not see a particular airline or route, please let us know, and we will do our best to add it in the future. Our goal is to provide you with the most comprehensive and accurate flight search experience available.',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const Faqs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  return (
    <motion.section
      className="w-[90%] mx-auto py-12 max-w-[1920px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.h2
        className="mb-10 text-black max-w-3xl"
        variants={fadeInUp}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            onClick={() => toggleAnswer(index)}
            className=" bg-[#F5F3ED] p-8 rounded-xl transition duration-300"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <div
              className=" flex items-center justify-between cursor-pointer "
              
            >
              <p className="main-para font-semibold mb-2">
                {faq.question}
              </p>
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
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="answer"
                  className="text-black overflow-y-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <motion.p
                    className='para-14'
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Faqs;