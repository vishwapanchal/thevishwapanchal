import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Robot from './Robot';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">VP.</div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">

          <div className="hero-text">
            <span className="greeting">Hello, I'm</span>
            <h1>Vishwa Panchal</h1>
            <h2>Cloud & DevOps Engineer</h2>
            <p>
              Passionate about building scalable infrastructure and automating pipelines.
            </p>
          </div>

          <div className="hero-3d">
            <Canvas gl={{ alpha: true }} camera={{ position: [0, 3, 14], fov: 50 }}>
  <color attach="background" args={["#00000000"]} />

              <ambientLight intensity={1.2} />
              <spotLight position={[0, -2.2, 0]} intensity={1} />

              <Suspense fallback={null}>
                <Robot
                  position={[0, -2.2, 0]}
                  rotation={[0, 0, 0]}
                  scale={window.innerWidth < 768 ? 2.2 : 1.3}
                />
                <Environment preset="studio" />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                autoRotate={false}
                target={[0, 1.6, 0]}
              />

            </Canvas>
          </div>

        </div>
      </header>

    </div>
  );
}

export default App;
