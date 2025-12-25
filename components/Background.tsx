import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ExtendedFloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: string;
  color: string;
  rotate: number;
  layer: number;
  rotationDirection: number;
  swayDistance: number;
  swayDuration: number;
}

const SHAPES = ['♥', '✦', '•', '⋆', '✿', '♪', '☁', '✧', '☀', '❄', '✾', '☘', '⚓', '♦', '❋', '✺', '❆'];
const COLORS = [
  'text-rose-300', 
  'text-pink-300', 
  'text-purple-300', 
  'text-sky-200', 
  'text-amber-200',
  'text-teal-200',
  'text-indigo-200',
  'text-orange-200',
  'text-emerald-200',
  'text-fuchsia-200'
];

const Background: React.FC = () => {
  const [elements, setElements] = useState<ExtendedFloatingElement[]>([]);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse Parallax Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
            x: (e.clientX / window.innerWidth) - 0.5,
            y: (e.clientY / window.innerHeight) - 0.5
        });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Parallax layers: define movement relative to scroll position
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);
  const layers = [y1, y2, y3];

  const yGrad = useTransform(scrollY, [0, 1000], [0, -80]);

  useEffect(() => {
    // Increased density to 100 for a richer background
    const newElements = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 25 + 5,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotate: Math.random() * 360,
      layer: Math.floor(Math.random() * 3),
      rotationDirection: Math.random() > 0.5 ? 1 : -1,
      swayDistance: Math.random() * 30 + 10,
      swayDuration: Math.random() * 10 + 10,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient Orbs - Enhanced with Scroll Parallax */}
      <motion.div 
        style={{ 
            y: yGrad,
            x: mousePosition.x * -30, // Gentle mouse opposite movement
        }} 
        animate={{ 
            x: mousePosition.x * -30,
            y: mousePosition.y * -30 
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.8 }}
        className="absolute inset-0"
      >
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700" />
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
        <div className="absolute top-[20%] left-[40%] w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500" />
        <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-200" />
        <div className="absolute top-[60%] left-[-5%] w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse delay-300" />
      </motion.div>

      {/* Floating Icons with Multi-Layer Parallax */}
      {elements.map((el) => {
        // Calculate mouse parallax offset based on layer depth
        // Deeper layers (lower index) move less, closer layers move more
        const mouseFactor = (el.layer + 1) * 40; 
        
        return (
            <motion.div
            key={el.id}
            className="absolute"
            style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                y: layers[el.layer], // Scroll Parallax
            }}
            animate={{
                x: mousePosition.x * mouseFactor * (el.id % 2 === 0 ? 1 : -1), // Some move opposite for depth
                y: mousePosition.y * mouseFactor * (el.id % 2 === 0 ? 1 : -1),
            }}
            transition={{ type: "spring", stiffness: 40, damping: 25 }}
            >
            <motion.div
                className={`${el.color} opacity-40`}
                style={{
                    fontSize: `${el.size}px`,
                }}
                initial={{ rotate: el.rotate, scale: 0 }}
                animate={{
                    y: [0, -50, 0], // Independent Float
                    x: [0, el.swayDistance, 0, -el.swayDistance, 0], // Horizontal Sway
                    opacity: [0, 0.5, 0], // Fade in/out
                    rotate: [el.rotate, el.rotate + (360 * el.rotationDirection)], // Continuous rotation
                    scale: [0.8, 1.2, 0.8], // Breathing effect
                }}
                transition={{
                    y: { 
                        duration: el.duration, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: el.delay 
                    },
                    x: {
                        duration: el.swayDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: el.delay
                    },
                    opacity: {
                        duration: el.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: el.delay
                    },
                    rotate: {
                        duration: el.duration * 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: el.duration * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                {el.shape}
            </motion.div>
            </motion.div>
        );
      })}
    </div>
  );
};

export default Background;