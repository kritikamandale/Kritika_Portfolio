'use client';
import React, { useEffect, useRef, useState } from 'react';

const CATEGORY_STYLES = {
  frontend: {
    base: 'border-[#8baef0]/60 shadow-[0_0_12px_rgba(139,174,240,0.2)]',
    glow: 'border-[#8baef0] shadow-[0_0_20px_rgba(139,174,240,0.6),inset_0_0_10px_rgba(139,174,240,0.3),0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(139,174,240,0.6),inset_0_0_10px_rgba(139,174,240,0.3)] bg-white/70 dark:bg-black/70'
  },
  ai: {
    base: 'border-[#a88bf0]/60 shadow-[0_0_12px_rgba(168,139,240,0.2)]',
    glow: 'border-[#a88bf0] shadow-[0_0_20px_rgba(168,139,240,0.6),inset_0_0_10px_rgba(168,139,240,0.3),0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(168,139,240,0.6),inset_0_0_10px_rgba(168,139,240,0.3)] bg-white/70 dark:bg-black/70'
  },
  data: {
    base: 'border-[#8bf0b8]/60 shadow-[0_0_12px_rgba(139,240,184,0.2)]',
    glow: 'border-[#8bf0b8] shadow-[0_0_20px_rgba(139,240,184,0.6),inset_0_0_10px_rgba(139,240,184,0.3),0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(139,240,184,0.6),inset_0_0_10px_rgba(139,240,184,0.3)] bg-white/70 dark:bg-black/70'
  },
  llms: {
    base: 'border-[#f08bba]/60 shadow-[0_0_12px_rgba(240,139,186,0.2)]',
    glow: 'border-[#f08bba] shadow-[0_0_20px_rgba(240,139,186,0.6),inset_0_0_10px_rgba(240,139,186,0.3),0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(240,139,186,0.6),inset_0_0_10px_rgba(240,139,186,0.3)] bg-white/70 dark:bg-black/70'
  },
  backend: {
    base: 'border-[#f0b88b]/60 shadow-[0_0_12px_rgba(240,184,139,0.2)]',
    glow: 'border-[#f0b88b] shadow-[0_0_20px_rgba(240,184,139,0.6),inset_0_0_10px_rgba(240,184,139,0.3),0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(240,184,139,0.6),inset_0_0_10px_rgba(240,184,139,0.3)] bg-white/70 dark:bg-black/70'
  }
};

const InteractiveGraph = () => {
  const containerRef = useRef(null);
  
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  const [mousePos, setMousePos] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const sizeMap = {
      large: ['React', 'Python', 'JavaScript', 'Node.js', 'Next.js', 'Deep Learning', 'LLMs', 'AI / ML', 'Data Science'],
      medium: ['Tailwind', 'CSS / SCSS', 'TypeScript', 'Streamlit', 'NLP', 'RAG', 'Hugging Face', 'TensorFlow', 'Keras', 'OpenAI API', 'LangChain', 'PyTorch', 'Neural Networks', 'Prompt Eng.', 'Scikit-Learn', 'Generative AI', 'Figma', 'PostgreSQL', 'Docker', 'Git / GitHub', 'MongoDB', 'REST API', 'GraphQL', 'AWS', 'Firebase'],
      small: ['Postman', 'Google Colab', 'Linux', 'C / C++', 'VS Code']
    };

    const catMap = {
      'frontend': ['React', 'JavaScript', 'Next.js', 'Tailwind', 'CSS / SCSS', 'TypeScript', 'Figma'],
      'ai': ['Deep Learning', 'AI / ML', 'NLP', 'RAG', 'Hugging Face', 'Generative AI', 'Neural Networks'],
      'data': ['Python', 'Data Science', 'Streamlit', 'TensorFlow', 'Keras', 'PyTorch', 'Scikit-Learn'],
      'llms': ['LLMs', 'OpenAI API', 'LangChain', 'Prompt Eng.'],
      'backend': ['Node.js', 'PostgreSQL', 'Docker', 'Git / GitHub', 'MongoDB', 'REST API', 'GraphQL', 'AWS', 'Firebase', 'Postman', 'Google Colab', 'Linux', 'C / C++', 'VS Code']
    };

    const generatedNodes = [];
    Object.entries(sizeMap).forEach(([size, names]) => {
      names.forEach(name => {
        let category = 'backend';
        for (const [cat, items] of Object.entries(catMap)) {
          if (items.includes(name)) category = cat;
        }
        generatedNodes.push({ id: name, size, category, x: 0, y: 0 });
      });
    });

    const { width, height } = dimensions;
    
    // 1. Fully organic random layout with distance constraint
    const positions = [];
    const safeW = width - 180;
    const safeH = height - 80;
    
    // Dynamically calculate safe minimum distance based on available area
    const area = safeW * safeH;
    const areaPerNode = area / generatedNodes.length;
    let minDistance = Math.sqrt((areaPerNode * 0.8) / Math.PI) * 1.7;
    minDistance = Math.max(80, Math.min(150, minDistance));

    const isValidPosition = (x, y) => {
      for (const p of positions) {
        const dist = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
        if (dist < minDistance) return false;
      }
      return true;
    };

    for (let i = 0; i < generatedNodes.length; i++) {
      let x, y;
      let found = false;
      let attempts = 0;
      
      // Try to find a non-overlapping spot
      while (attempts < 2000) {
        x = 90 + Math.random() * safeW;
        y = 40 + Math.random() * safeH;
        
        if (isValidPosition(x, y)) {
          found = true;
          break;
        }
        attempts++;
      }
      
      // Fallback if space is too tight
      if (!found) {
        x = 90 + Math.random() * safeW;
        y = 40 + Math.random() * safeH;
      }
      
      positions.push({ x, y });
    }

    generatedNodes.forEach((n, i) => {
      n.x = positions[i].x;
      n.y = positions[i].y;
    });

    // 2. Nearest Neighbor Linking
    const generatedLinks = [];
    generatedNodes.forEach(n => {
      const dists = generatedNodes
        .filter(other => other.id !== n.id)
        .map(other => ({
          target: other,
          dist: Math.sqrt(Math.pow(n.x - other.x, 2) + Math.pow(n.y - other.y, 2))
        }))
        .sort((a, b) => a.dist - b.dist);
      
      const edgeCount = n.size === 'large' ? 4 : (n.size === 'medium' ? 3 : 2);
      
      for(let i=0; i<edgeCount; i++) {
        const targetId = dists[i].target.id;
        const exists = generatedLinks.some(l => 
          (l.source.id === n.id && l.target.id === targetId) || 
          (l.source.id === targetId && l.target.id === n.id)
        );
        if (!exists) {
          generatedLinks.push({ source: n, target: dists[i].target });
        }
      }
    });

    setNodes(generatedNodes);
    setLinks(generatedLinks);
  }, [dimensions.width, dimensions.height]);

  // Helper: Distance from point to line segment
  const distToSegment = (px, py, x1, y1, x2, y2) => {
    const l2 = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);
    return Math.hypot(px - projX, py - projY);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const HOVER_RADIUS = 160;
  const STRING_HOVER_RADIUS = 80;
  const hasHover = !!mousePos;

  return (
    <div 
      className="w-full h-[calc(100vh-150px)] min-h-[600px] max-h-[900px] max-md:h-[500px] max-md:min-h-[500px] relative bg-transparent overflow-hidden rounded-2xl font-sans cursor-grab active:cursor-grabbing"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {nodes.length > 0 && (
        <>
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
            <g>
              {links.map((link, i) => {
                let isActive = false;
                if (mousePos) {
                  const dist = distToSegment(mousePos.x, mousePos.y, link.source.x, link.source.y, link.target.x, link.target.y);
                  
                  // Active if mouse is near the string, or near either of the connected nodes
                  const sourceDist = Math.hypot(link.source.x - mousePos.x, link.source.y - mousePos.y);
                  const targetDist = Math.hypot(link.target.x - mousePos.x, link.target.y - mousePos.y);
                  
                  isActive = dist < STRING_HOVER_RADIUS || sourceDist < HOVER_RADIUS || targetDist < HOVER_RADIUS;
                }

                const edgeOpacity = hasHover ? (isActive ? 'opacity-100' : 'opacity-[0.15]') : 'opacity-50';
                const edgeStrokeWidth = isActive ? 'stroke-[2.5px]' : 'stroke-[1.2px]';
                const edgeStrokeColor = isActive ? 'stroke-zinc-900 dark:stroke-white' : 'stroke-[#c8bcb0] dark:stroke-white/20';

                return (
                  <line
                    key={i}
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                    className={`fill-none transition-all duration-300 ease ${edgeOpacity} ${edgeStrokeWidth} ${edgeStrokeColor}`}
                  />
                );
              })}
            </g>
          </svg>
          
          <div className="absolute inset-0 w-full h-full origin-top-left z-[2] pointer-events-none">
            {nodes.map((node) => {
              let isHovered = false;
              if (mousePos) {
                const dist = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
                if (dist < HOVER_RADIUS) {
                  isHovered = true;
                }
              }
              
              const catStyles = CATEGORY_STYLES[node.category] || CATEGORY_STYLES.backend;
              const dynamicStyle = isHovered ? catStyles.glow : catStyles.base;
              const hoverTransform = isHovered ? 'z-10 !scale-[1.15] !-translate-y-2' : 'z-[2]';
              const opacityStyle = hasHover ? (isHovered ? 'opacity-100' : 'opacity-[0.15] !shadow-none') : 'opacity-100';
              
              return (
                <div
                  key={node.id}
                  className={`
                    absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 
                    bg-white/45 dark:bg-black/45 backdrop-blur-[12px] 
                    border-[1.5px] border-white/80 dark:border-white/20 
                    rounded-[40px] flex items-center justify-center gap-2 
                    px-[18px] py-[8px] text-[13px] font-semibold tracking-[0.02em] 
                    text-[#1a1a1a] dark:text-white pointer-events-auto cursor-default 
                    transition-all duration-300 ease select-none
                    ${dynamicStyle} ${hoverTransform} ${opacityStyle}
                  `}
                  style={{ 
                    left: `${node.x}px`, 
                    top: `${node.y}px`
                  }}
                >
                  {node.id}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default InteractiveGraph;
