import React, { useState, useEffect } from "react";
import "./Services.css";

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

// ---------- Services Component ----------
interface Service {
  title: string;
  content: React.ReactNode;
}

const servicesList: Service[] = [
  {
    title: "Web Development",
    content: (
      <>
        <p>End-to-end responsive websites & web applications.</p>
        <ul>
          <li>Front-end: React, Vite, Next.js, Tailwind, Material UI</li>
          <li>Back-end: Node.js, Express, Python Flask/Django, Java Spring Boot</li>
          <li>Databases: MongoDB, MySQL, PostgreSQL, Firebase</li>
          <li>Deployment: AWS, Azure, Netlify, Vercel, Docker</li>
        </ul>
      </>
    ),
  },
  {
    title: "AI / ML Development",
    content: (
      <>
        <p>AI & ML solutions including computer vision, NLP, and predictive analytics.</p>
        <ul>
          <li>Languages: Python, R</li>
          <li>Frameworks: TensorFlow, PyTorch, Keras, scikit-learn</li>
          <li>Applications: Object detection, chatbots, recommendation engines</li>
          <li>Deployment: Cloud & Edge devices</li>
        </ul>
      </>
    ),
  },
  {
    title: "Dataset Creation",
    content: (
      <>
        <p>High-quality datasets for AI & analytics.</p>
        <ul>
          <li>Collection: images, videos, audio, structured data</li>
          <li>Cleaning, annotation, augmentation</li>
          <li>Version control & documentation</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Analysis",
    content: (
      <>
        <p>Processing & visualizing data for insights.</p>
        <ul>
          <li>Dashboards: Tableau, PowerBI, D3.js</li>
          <li>Python/R scripts for analysis</li>
          <li>Business intelligence & KPI reporting</li>
        </ul>
      </>
    ),
  },
  {
    title: "IoT Solutions",
    content: (
      <>
        <p>Smart IoT systems integrating devices, sensors, and cloud.</p>
        <ul>
          <li>Hardware: Arduino, Raspberry Pi, ESP32</li>
          <li>Cloud: AWS IoT, Azure IoT</li>
          <li>Real-time monitoring & automation</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cloud Services",
    content: (
      <>
        <p>Backend & cloud infrastructure for scalable apps.</p>
        <ul>
          <li>API: REST, GraphQL, Microservices</li>
          <li>Cloud: AWS, GCP, Azure</li>
          <li>Security, monitoring & reliability</li>
        </ul>
      </>
    ),
  },
  {
    title: "Mobile App Development",
    content: (
      <>
        <p>iOS & Android apps with cross-platform frameworks.</p>
        <ul>
          <li>React Native, Flutter, Swift, Kotlin</li>
          <li>Performance optimization & responsive UI</li>
          <li>Push notifications, analytics, and in-app features</li>
        </ul>
      </>
    ),
  },
  {
    title: "E-commerce Solutions",
    content: (
      <>
        <p>Custom e-commerce platforms & integrations.</p>
        <ul>
          <li>Shopify, WooCommerce, Magento, Custom SaaS</li>
          <li>Payment gateways & shopping cart solutions</li>
          <li>Inventory management & order tracking</li>
        </ul>
      </>
    ),
  },
  {
    title: "Automation Tools",
    content: (
      <>
        <p>Workflow automation & robotic process automation.</p>
        <ul>
          <li>Python scripting, Selenium, RPA frameworks</li>
          <li>Business process optimization</li>
          <li>API integrations & data pipelines</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cybersecurity",
    content: (
      <>
        <p>Protecting systems, data, and networks.</p>
        <ul>
          <li>Penetration testing & vulnerability scanning</li>
          <li>Encryption & authentication solutions</li>
          <li>Cloud & application security audits</li>
        </ul>
      </>
    ),
  },
  {
    title: "AR / VR Development",
    content: (
      <>
        <p>Augmented & virtual reality experiences.</p>
        <ul>
          <li>Unity3D, Unreal Engine, WebXR</li>
          <li>Interactive training & simulation applications</li>
          <li>Marketing & visualization tools</li>
        </ul>
      </>
    ),
  },
  {
    title: "Consulting & Strategy",
    content: (
      <>
        <p>Expert advice on technology & digital transformation.</p>
        <ul>
          <li>Project planning & feasibility</li>
          <li>Process optimization</li>
          <li>Cloud, AI, IoT, and software strategy consulting</li>
        </ul>
      </>
    ),
  },
];

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);

  const openService = (index: number) => setActiveService(index);
  const closeService = () => setActiveService(null);

  return (
    <div className="services-container">
      <TreeColumns color="#33ff33" side="left" />
      <TreeColumns color="#bb33ff" side="right" />

      <div className="services-grid">
        {servicesList.map((service, idx) => (
          <div key={idx} className="service-card" onClick={() => openService(idx)}>
            {service.title}
          </div>
        ))}
      </div>

      {activeService !== null && (
        <div className="modal-overlay" onClick={closeService}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {servicesList[activeService].content}
            <button className="close-btn" onClick={closeService}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
