import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Robot from './Robot';
import './App.css';

const DATA = {
  profile: {
    name: "Vishwa Panchal",
    role: "Cloud & DevOps Engineer",
    summary: "Results-driven DevOps Engineer with a proven track record in architecting scalable cloud infrastructure and automating CI/CD pipelines. Expert in AWS, Kubernetes, and virtualization, committed to optimizing system reliability and deployment efficiency.",
    location: "Bangalore, India",
    email: "thevishwapanchal@gmail.com",
    social: [
      { name: "LinkedIn", url: "https://linkedin.com/in/thevishwapanchal" },
      { name: "GitHub", url: "https://github.com/vishwapanchal" }
    ]
  },
  education: [
    {
      id: 1,
      school: "R. V. College of Engineering",
      degree: "B.E. in Information Science & Engineering",
      date: "2024 -- Present",
      location: "Bangalore, India",
      desc: "Specializing in Cloud Computing and Enterprise Architecture."
    },
    {
      id: 2,
      school: "Government Polytechnic",
      degree: "Diploma in Computer Science",
      date: "2021 -- 2023",
      location: "Kalaburagi, India",
      desc: "Graduated with Distinction (CGPA: 9.73). Focused on System Administration and Network Security."
    }
  ],
  experience: [
    {
      id: 1,
      company: "ProLEAP Academy",
      role: "R&D Intern (Cloud Infrastructure)",
      date: "Jan 2024 -- Apr 2024",
      desc: "Spearheaded the design and management of virtualization infrastructure using VMware and AWS. Orchestrated automated Linux administration workflows via Bash scripting, reducing manual operational overhead by 40%. Deployed scalable containerized applications using Docker and Kubernetes, and engineered robust CI/CD pipelines with Jenkins to accelerate release cycles. Recognized as the Top Performer in a competitive cohort of 60+ engineers."
    }
  ],
  projects: [
    {
      id: 1,
      title: "Cloud-Hosted EL Management Platform",
      role: "Full Stack & DevOps Lead",
      tags: ["AWS EC2", "FastAPI", "PostgreSQL", "Vector DB"],
      desc: "Architected a secure, high-availability experiential learning platform on AWS. Integrated FAISS Vector DB and Xiaomi MiMo-V2-Flash models to engineer an automated plagiarism detection system, significantly reducing grading time. Implemented rigorous security protocols via AWS Security Groups and managed seamless external access configurations.",
      link: "https://github.com/vishwapanchal/project-trueproject",
      live: null
    },
    {
      id: 2,
      title: "Gram Sahayak: Digital Governance Suite",
      role: "System Architect",
      tags: ["Microservices", "WebSockets", "Geo-Spatial", "AI"],
      desc: "Engineered a real-time governance ecosystem facilitating low-latency communication between citizens and officials via WebSockets. Developed a geo-spatial tracking module using Leaflet and deployed a multilingual AI chatbot to enhance accessibility for diverse user demographics. Optimized backend performance for high-concurrency usage.",
      link: "https://github.com/vishwapanchal/project-gramsahayak",
      live: "https://gramsahayak.vercel.app"
    }
  ],
  skills: {
    "Cloud Infrastructure": ["AWS (EC2, S3, VPC, IAM)", "Google Cloud Platform"],
    "DevOps & Automation": ["Docker", "Kubernetes", "Jenkins", "Ansible", "Terraform", "Git/GitHub"],
    "Backend Engineering": ["Python (FastAPI)", "RESTful APIs", "Microservices Architecture", "Node.js"],
    "Data & Storage": ["PostgreSQL", "MongoDB", "MySQL", "FAISS (Vector DB)"],
    "System Administration": ["Linux (RHEL, Ubuntu)", "Bash Scripting", "Networking Protocols"]
  },
  certs: [
    { name: "GCP Cloud Arcade Legend", issuer: "Google Cloud", date: "Jun 2025", link: "https://www.cloudskillsboost.google/public_profiles/483f7fc1-eb7b-4966-8d27-cb43c6858bfc" },
    { name: "Cisco Networking Basics", issuer: "Cisco Academy", date: "Mar 2025", link: "https://www.credly.com/badges/a980ec04-0abf-4d73-b4e9-0a15ba130288/public_url" },
    { name: "Data Structures & Algorithms", issuer: "Udemy", date: "Jul 2022", link: "https://www.udemy.com/certificate/UC-c5e7b057-28a5-41e5-8f98-c5f2c9e300cc/" }
  ]
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      
      {/* NAVIGATION */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            VP.
          </div>
          
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('about')}>Profile</button>
            <button onClick={() => scrollToSection('experience')}>Experience</button>
            <button onClick={() => scrollToSection('projects')}>Projects</button>
            <button onClick={() => scrollToSection('skills')}>Skills</button>
            <button onClick={() => scrollToSection('education')}>Education</button>
            <a href={`mailto:${DATA.profile.email}`} className="contact-btn">Hire Me</a>
          </div>

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero" id="about">
        <div className="hero-content">
          <div className="hero-text">
            <span className="greeting">Cloud & DevOps Engineer</span>
            <h1>{DATA.profile.name}</h1>
            <p className="summary">{DATA.profile.summary}</p>
            <div className="social-links">
              {DATA.profile.social.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="social-btn">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="hero-3d">
            <Canvas camera={{ position: [0, 1.0, 12], fov: 30 }}>
              <ambientLight intensity={1.0} />
              <spotLight position={[5, 10, 5]} angle={0.5} penumbra={1} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Suspense fallback={null}>
                <Robot position={[0, -3.0, 0]} rotation={[0, 0, 0]} scale={1.0} />
                <Environment preset="studio" />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
          </div>
        </div>
      </header>

      {/* EXPERIENCE SECTION */}
      <section className="section" id="experience">
        <div className="section-container">
          <h3 className="section-title">Professional Experience</h3>
          <div className="timeline">
            {DATA.experience.map(exp => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{exp.company}</h4>
                    <span className="date-badge">{exp.date}</span>
                  </div>
                  <h5 className="role-title">{exp.role}</h5>
                  <p>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="section bg-alt" id="projects">
        <div className="section-container">
          <h3 className="section-title">Key Projects</h3>
          <div className="projects-grid">
            {DATA.projects.map(proj => (
              <div key={proj.id} className="project-card">
                <div className="card-header">
                  <h4>{proj.title}</h4>
                  <span className="role-tag">{proj.role}</span>
                </div>
                <div className="card-body">
                  <p>{proj.desc}</p>
                  <div className="tech-stack">
                    {proj.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>
                <div className="card-footer">
                  <a href={proj.link} target="_blank" rel="noreferrer" className="link-btn">
                    GitHub Repo
                  </a>
                  {proj.live && (
                    <a href={proj.live} target="_blank" rel="noreferrer" className="link-btn live-btn">
                      Live Deployment
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="section" id="skills">
        <div className="section-container">
          <h3 className="section-title">Technical Expertise</h3>
          <div className="skills-grid">
            {Object.entries(DATA.skills).map(([category, items]) => (
              <div key={category} className="skill-card">
                <h4>{category}</h4>
                <div className="skill-tags">
                  {items.map(skill => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTS */}
      <section className="section bg-alt" id="education">
        <div className="section-container">
          <div className="dual-grid">
            
            {/* Education Col */}
            <div className="col">
              <h3 className="section-title left">Education</h3>
              <div className="list-group">
                {DATA.education.map(edu => (
                  <div key={edu.id} className="list-item">
                    <h4>{edu.school}</h4>
                    <p className="degree">{edu.degree}</p>
                    <p className="meta">{edu.date} | {edu.location}</p>
                    <p className="desc">{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certs Col */}
            <div className="col">
              <h3 className="section-title left">Certifications</h3>
              <div className="list-group">
                {DATA.certs.map((c, i) => (
                  <div key={i} className="list-item cert-item">
                    <div className="cert-info">
                      <h4>{c.name}</h4>
                      <p className="issuer">{c.issuer}</p>
                      <p className="meta">{c.date}</p>
                    </div>
                    <a href={c.link} target="_blank" rel="noreferrer" className="view-cert">View &rarr;</a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Vishwa Panchal. Engineered for Scalability.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;
