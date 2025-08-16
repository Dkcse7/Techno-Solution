import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Home.css";

const TREE_CHARS = ["|", "/", "\\", "-", "•", "│", "─", "┌", "┐", "└", "┘", "┤", "├"];
const COLUMNS = 25;

interface ColumnState {
  chars: string[];
}

const generateTreeLine = () => {
  let line = "";
  for (let i = 0; i < 10; i++) {
    line += TREE_CHARS[Math.floor(Math.random() * TREE_CHARS.length)];
  }
  return line;
};

interface TreeProps {
  color: string;
  side: "left" | "right";
}

const TreeColumns: React.FC<TreeProps> = ({ color, side }) => {
  const [columns, setColumns] = useState<ColumnState[]>([]);

  useEffect(() => {
    const ROWS = Math.floor(window.innerHeight / 16);
    const initialCols: ColumnState[] = [];
    for (let i = 0; i < COLUMNS; i++) {
      initialCols.push({ chars: Array(ROWS).fill(" ") });
    }
    setColumns(initialCols);

    const interval = setInterval(() => {
      setColumns((prevCols) =>
        prevCols.map((col) => {
          const newChars = [...col.chars];
          newChars.shift();
          newChars.push(generateTreeLine());
          return { chars: newChars };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`tree-container ${side}`}>
      {columns.map((col, i) => (
        <div key={i} className="tree-column">
          {col.chars.map((char, idx) => (
            <div key={idx} className="tree-char" style={{ color }}>
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <TreeColumns color="#33ff33" side="left" />
      <TreeColumns color="#bb33ff" side="right" />

      {/* Hero Section */}
      <motion.div
        className="hero-text"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1>Techno Solutions</h1>
        <p>Innovative Technology. Real Solutions.</p>
      </motion.div>

      {/* Content Blocks Section */}
      <div className="section content-blocks">
        <div className="card">
          <h3>IT Solutions & Software Projects</h3>
          <p>Custom software solutions across multiple tech stacks.</p>
        </div>
        <div className="card">
          <h3>AI Projects</h3>
          <p>Advanced AI & ML projects delivering intelligent automation.</p>
        </div>
        <div className="card">
          <h3>Hardware-Software Integration</h3>
          <p>Seamless integration of software with hardware devices.</p>
        </div>
        <div className="card">
          <h3>Any Tech Stack</h3>
          <p>Expertise in diverse programming languages and frameworks.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
