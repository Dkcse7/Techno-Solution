import React, { useEffect, useState } from "react";
import "./Contact.css";

// ---------- TreeColumns Component ----------
const TREE_CHARS = ["|", "/", "\\", "-", "•", "│", "─", "┌", "┐", "└", "┘", "┤", "├"];
const COLUMNS = 25;

interface ColumnState {
  chars: string[];
}

interface TreeProps {
  color: string;
  side: "left" | "right";
}

const generateTreeLine = () => {
  let line = "";
  for (let i = 0; i < 10; i++) {
    line += TREE_CHARS[Math.floor(Math.random() * TREE_CHARS.length)];
  }
  return line;
};

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

// ---------- Contact Component ----------
const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      {/* Background Trees */}
      <TreeColumns color="#33ff33" side="left" />
      <TreeColumns color="#bb33ff" side="right" />

      {/* Contact Card */}
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Reach out via email or phone:</p>
        <div className="contact-info">
          <p><strong>Email:</strong> info@technosolutions.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Address:</strong> 123 Techno Street, Pune, Maharashtra, India</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
