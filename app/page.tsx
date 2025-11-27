'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustHeight();
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      // 保存当前滚动位置
      const scrollY = window.scrollY;
      
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      
      // 恢复滚动位置，防止页面跳动
      window.scrollTo(0, scrollY);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      adjustHeight();
    }
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-24 px-6 sm:px-8">
      <div className="w-full max-w-3xl">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleInput}
          placeholder="Start writing..."
          className="w-full bg-transparent text-xl sm:text-2xl leading-relaxed outline-none resize-none overflow-hidden placeholder:text-gray-300 text-foreground font-serif"
          style={{ minHeight: '70vh' }}
          spellCheck={false}
        />
      </div>
    </main>
  );
}
