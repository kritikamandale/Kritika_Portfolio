import React from 'react';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import RevealGroup from '../../components/RevealGroup/RevealGroup';

const PHILOSOPHIES = [
  {
    id: '01',
    heading: 'Learning by Building',
    text: 'Tutorials can only take you so far. I believe true understanding comes from getting your hands dirty in the codebase, breaking things, and figuring out how to piece them back together. Every project is a stepping stone.',
  },
  {
    id: '02',
    quote: '"AI won\'t replace you... someone using AI will."',
    heading: 'AI is an Amplifier',
    text: 'Embracing intelligent tools isn\'t cheating; it\'s the key to modern engineering. I leverage AI to accelerate development, allowing me to focus on architecture, user experience, and solving the right problems.',
  }
];

const Philosophy = () => {
  return (
    <SectionWrapper
      id="philosophy"
      label="Mindset"
      title="Learning & Growth"
      subtitle="The core principles that drive my work and personal development."
    >
      <RevealGroup staggerDelay={150} className="flex flex-col max-w-[800px] mx-auto">
        {PHILOSOPHIES.map((item, index) => (
          <div key={item.id} className="flex items-start gap-4 md:gap-6 py-4 md:py-6 border-b-[0.5px] border-black/15 dark:border-white/15 first:pt-0 last:border-b-0 last:pb-0">
            <div className="min-w-[24px] text-brand-mauve dark:text-[#a18a96] text-sm font-medium pt-1">{item.id}</div>
            <div className="flex flex-col">
              {item.quote && <span className="text-[#c47a3a] text-[23px] italic font-bold mb-1.5 block">{item.quote}</span>}
              <h3 className="font-serif text-[32px] font-bold text-text-primary dark:text-text-dark-primary mb-2 leading-[1.2]">{item.heading}</h3>
              <p className="text-base leading-[1.8] text-text-secondary dark:text-text-dark-secondary">{item.text}</p>
            </div>
          </div>
        ))}
      </RevealGroup>
    </SectionWrapper>
  );
};

export default Philosophy;
