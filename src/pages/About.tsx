import React, { useEffect, useState } from "react";
import "./About.css";

// TreeColumns component
interface TreeProps {
  color: string;
  side: "left" | "right";
}

interface ColumnState {
  chars: string[];
}

const TREE_CHARS = ["|", "/", "\\", "-", "•", "│", "─", "┌", "┐", "└", "┘", "┤", "├"];
const COLUMNS = 25;

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

// Team members data
const teamMembers = [
  {
    name: "Mr.Alok Jadhav",
    role: "CEO & Founder",
    photo: "/images/ceo.jpeg",
    info: "Visionary leader driving innovation and growth.",
  },
  {
    name: "Mr.Digvijay Kharade",
    role: "CTO & Co-Founder",
    photo: "/images/cto.jpeg",
    info: "Technology strategist and AI specialist.",
  },
  {
    name: "Mr.Mohit Joshi",
    role: "General Manager",
    photo: "/images/gm.jpeg",
    info: "Ensures smooth operations across projects.",
  },
  {
    name: "Mr.Onkar Mane",
    role: "HR Manager",
    photo: "/images/tc.png",
    info: "Manages talent, culture, and employee wellbeing.",
  },
];

const About: React.FC = () => {
  return (
    <div className="about-container">
      {/* Background Trees */}
      <TreeColumns color="#33ff33" side="left" />
      <TreeColumns color="#bb33ff" side="right" />

      {/* Company Info */}
      <div className="company-info">
        <h1>About TechnoSolutions</h1>
        <p>
          TechnoSolutions is a leading technology solutions provider, committed to delivering innovative software and hardware solutions to businesses worldwide. With a focus on cutting-edge technologies, we help organizations transform digitally and achieve operational excellence. Our mission is to bridge the gap between business needs and technological capabilities through creative problem-solving, robust engineering, and dedicated support.
        </p>
        <p>
          Founded by industry experts, TechnoSolutions brings together a team of experts in AI, software development, IT infrastructure, and hardware-software integration. We pride ourselves on building scalable solutions that drive measurable impact for our clients.
        </p>
      </div>

      {/* Our Expertise */}
      <div className="expertise-section">
        <h2>Our Expertise</h2>
        <ul>
          <li><strong>Software Development & IT Solutions:</strong> Custom applications, enterprise software, cloud infrastructure.</li>
          <li><strong>AI & Machine Learning Projects:</strong> Computer vision, NLP, predictive analytics, AI integration.</li>
          <li><strong>Hardware-Software Integration:</strong> IoT devices, embedded systems, smart automation solutions.</li>
          <li><strong>Technology Stack & Consulting:</strong> Python, C/C++, JavaScript, React, Node.js, Django, IT consulting.</li>
          <li><strong>Project Management & Delivery:</strong> Agile practices, end-to-end project lifecycle management, support and maintenance.</li>
        </ul>
      </div>

      {/* Team Section */}
      <div className="team-section">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="team-card">
            <img src={member.photo} alt={member.name} />
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="info">{member.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
