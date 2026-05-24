'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './InteractiveGraph.module.css';

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

  return (
    <div 
      className={`${styles.container} ${mousePos ? styles.hasHover : ''}`} 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {nodes.length > 0 && (
        <>
          <svg className={styles.svgLayer}>
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

                return (
                  <line
                    key={i}
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                    className={`${styles.edge} ${isActive ? styles.active : ''}`}
                  />
                );
              })}
            </g>
          </svg>
          
          <div className={styles.htmlLayer}>
            {nodes.map((node) => {
              let isHovered = false;
              let isConnected = false; // Using connected class as a "soft" glow if we wanted, but let's just use hovered
              
              if (mousePos) {
                const dist = Math.hypot(node.x - mousePos.x, node.y - mousePos.y);
                if (dist < HOVER_RADIUS) {
                  isHovered = true;
                }
              }
              
              let glowClass = '';
              if (isHovered) {
                glowClass = styles[`glow-${node.category}`];
              }
              
              return (
                <div
                  key={node.id}
                  className={`
                    ${styles.node} 
                    ${styles[node.category]}
                    ${isHovered ? styles.hovered : ''}
                    ${glowClass}
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
