// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

interface P5BackgroundProps {
  isDarkMode: boolean;
}

const P5Background: React.FC<P5BackgroundProps> = ({ isDarkMode }) => {
  // Properties for the particles
  const particles: Particle[] = [];
  const connections: Connection[] = [];
  const attractors: Attractor[] = [];
  
  // Golden ratio constant
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PHI = 1.618;
  
  // Flow state parameters
  let flowIntensity = 0;
  let lastInteractionTime = 0;
  const INTERACTION_MEMORY = 2000; // How long the system "remembers" user interaction in ms
  
  // Dynamic parameters for flow state
  let particleCount = 40;
  let noiseScale = 0.01;
  let noiseStrength = 1;
  let userEngagement = 0; // Tracks how engaged the user is (0-1)
  
  // Track mouse movement for flow state
  let prevMouseX = 0;
  let prevMouseY = 0;
  let mouseVelocity = 0;
  let mouseActive = false;

  class Particle {
    position: p5Types.Vector;
    velocity: p5Types.Vector;
    acceleration: p5Types.Vector;
    size: number;
    baseSize: number;
    color: p5Types.Color;
    p5: p5Types;
    life: number;
    maxLife: number;
    id: number;
    energy: number; // Energy level for flow animation
    
    constructor(p5: p5Types, x: number, y: number, id: number) {
      this.p5 = p5;
      this.position = p5.createVector(x, y);
      this.velocity = p5.createVector(0, 0);
      this.acceleration = p5.createVector(0, 0);
      this.id = id;
      
      // Random size with golden ratio influence
      this.baseSize = p5.random(3, 8);
      this.size = this.baseSize;
      
      // Life span for particles
      this.maxLife = p5.random(150, 300);
      this.life = this.maxLife;
      
      // Energy level starts at random
      this.energy = p5.random(0.5, 1);
      
      // Create colors based on the theme
      if (isDarkMode) {
        const blueHue = p5.random(180, 240); // Blue spectrum
        this.color = p5.color(blueHue, p5.random(70, 90), p5.random(80, 100), 0.7);
      } else {
        // Açık mod için daha zarif ve pastel turkuaz/mavi tonları
        const blueHue = p5.random(190, 215); // Daha sınırlı ve zarif mavi tonu
        this.color = p5.color(blueHue, p5.random(45, 65), p5.random(75, 90), 0.55); // Daha şeffaf ve yumuşak
      }
    }
    
    update(p5: p5Types, flowState: number) {
      // Flow field influence
      const angle = p5.noise(
        this.position.x * noiseScale, 
        this.position.y * noiseScale
      ) * p5.TWO_PI * noiseStrength;
      
      const flowForce = p5.createVector(
        Math.cos(angle) * 0.1, 
        Math.sin(angle) * 0.1
      );
      
      // Increase energy based on flow state
      this.energy = p5.constrain(this.energy + (flowState * 0.01), 0.5, 2);
      
      // Size pulses with energy
      this.size = this.baseSize * (1 + 0.3 * Math.sin(p5.frameCount * 0.05 * this.energy));
      
      // Apply force and update position with energy influence
      this.acceleration.add(flowForce);
      this.velocity.add(this.acceleration);
      
      // Velocity influenced by the flow state energy
      const maxSpeed = 2 * (1 + flowState);
      this.velocity.limit(maxSpeed); 
      
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      
      // Slowly reduce energy when no interaction
      if (flowState < 0.1) {
        this.energy *= 0.99;
      }
      
      // Decrease life, but slower during high flow state
      this.life -= 1 / (1 + flowState); 
      
      // Bounce off edges with slight energy loss
      if (this.position.x < 0 || this.position.x > p5.width) {
        this.velocity.x *= -0.9;
        this.energy *= 0.95;
      }
      
      if (this.position.y < 0 || this.position.y > p5.height) {
        this.velocity.y *= -0.9;
        this.energy *= 0.95;
      }
      
      // Apply forces from attractors
      for (const attractor of attractors) {
        if (attractor.active) {
          const force = attractor.getForce(this.position);
          this.acceleration.add(force);
        }
      }
    }
    
    display(p5: p5Types, flowState: number) {
      // Fade based on life
      const alpha = p5.map(this.life, 0, this.maxLife, 0, 1) * (0.7 + flowState * 0.3);
      const particleColor = p5.color(p5.hue(this.color), 
                                   p5.saturation(this.color) * (1 + flowState * 0.3), 
                                   p5.brightness(this.color) * (1 + flowState * 0.2), 
                                   alpha);
      
      // Glow effect intensifies with flow
      p5.noStroke();
      
      // Outer glow
      const glowSize = this.size * (3 + flowState * 2);
      
      // Adjusted colors for light mode
      if (isDarkMode) {
        p5.fill(particleColor.levels[0], particleColor.levels[1], particleColor.levels[2], 5 + flowState * 10);
      } else {
        // Daha zarif outer glow
        p5.fill(195, 60, 85, 4 + flowState * 8);
      }
      
      p5.circle(this.position.x, this.position.y, glowSize);
      
      // Inner glow
      const innerGlowSize = this.size * (2 + flowState);
      
      if (isDarkMode) {
        p5.fill(particleColor.levels[0], particleColor.levels[1], particleColor.levels[2], 15 + flowState * 20);
      } else {
        // Daha zarif inner glow
        p5.fill(200, 65, 87, 12 + flowState * 15);
      }
      
      p5.circle(this.position.x, this.position.y, innerGlowSize);
      
      // Core - pulses with energy
      if (!isDarkMode) {
        // Açık mod için daha zarif core rengi
        p5.fill(205, 70, 90, alpha);
      } else {
        p5.fill(particleColor);
      }
      
      p5.circle(this.position.x, this.position.y, this.size);
    }
    
    isDead() {
      return this.life <= 0;
    }
    
    applyForce(force: p5Types.Vector) {
      // Mass is proportional to size
      const mass = this.size / 5;
      const f = p5Types.Vector.div(force, mass);
      this.acceleration.add(f);
    }
  }
  
  class Connection {
    p1: Particle;
    p2: Particle;
    distance: number;
    lifespan: number;
    maxLife: number;
    p5: p5Types;
    strength: number;
    
    constructor(p5: p5Types, p1: Particle, p2: Particle) {
      this.p5 = p5;
      this.p1 = p1;
      this.p2 = p2;
      this.distance = p5.dist(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
      this.maxLife = 40;
      this.lifespan = this.maxLife;
      this.strength = p5.random(0.7, 1.3); // Variable connection strength for visual interest
    }
    
    display(p5: p5Types, flowState: number) {
      const d = p5.dist(this.p1.position.x, this.p1.position.y, this.p2.position.x, this.p2.position.y);
      
      if (d < 200) {
        const alpha = p5.map(d, 0, 200, 0.2, 0);
        
        // Adjust line thickness based on distance and flow state
        const lineWeight = p5.map(d, 0, 200, 2 + flowState, 0.1) * this.strength;
        
        // Colors are more vibrant during flow state
        if (isDarkMode) {
          p5.stroke(200, 100 + flowState * 50, 255, alpha * (this.lifespan / this.maxLife));
        } else {
          // Daha zarif bağlantı rengi
          p5.stroke(200, 40 + flowState * 15, 88, alpha * (this.lifespan / this.maxLife) * 0.65); 
        }
        
        p5.strokeWeight(lineWeight);
        
        // Draw line with slight curve that pulses with flow
        p5.line(this.p1.position.x, this.p1.position.y, this.p2.position.x, this.p2.position.y);
      }
      
      // Lifespan decreases slower during high flow
      this.lifespan -= 1 / (1 + flowState * 0.5);
    }
    
    isDead() {
      const d = this.p5.dist(this.p1.position.x, this.p1.position.y, this.p2.position.x, this.p2.position.y);
      return this.lifespan <= 0 || d > 250 || this.p1.isDead() || this.p2.isDead();
    }
  }
  
  class Attractor {
    position: p5Types.Vector;
    strength: number;
    radius: number;
    active: boolean;
    p5: p5Types;
    lifespan: number;
    maxLife: number;
    
    constructor(p5: p5Types, x: number, y: number, strength = 1, isRepeller = false) {
      this.p5 = p5;
      this.position = p5.createVector(x, y);
      this.strength = isRepeller ? -strength : strength;
      this.radius = 50 + Math.abs(strength) * 20;
      this.active = true;
      this.maxLife = 60;
      this.lifespan = this.maxLife;
    }
    
    update() {
      this.lifespan--;
      this.active = this.lifespan > 0;
    }
    
    getForce(particlePosition: p5Types.Vector): p5Types.Vector {
      // Calculate direction of force
      const force = p5Types.Vector.sub(this.position, particlePosition);
      
      // Distance between objects
      let distance = force.mag();
      
      // Limiting the distance to prevent super strong forces
      distance = Math.max(5, Math.min(distance, this.radius));
      
      // Normalize force vector to get direction
      force.normalize();
      
      // Calculate strength based on distance and life
      const lifeInfluence = this.lifespan / this.maxLife;
      const intensity = this.p5.map(distance, 0, this.radius, this.strength, 0) * lifeInfluence;
      
      // Multiply by strength adjusted by distance and lifespan
      force.mult(intensity);
      
      return force;
    }
    
    display(p5: p5Types) {
      if (!this.active) return;
      
      const alpha = p5.map(this.lifespan, 0, this.maxLife, 0, 50);
      p5.noStroke();
      
      // Different colors for attractors and repellers
      if (this.strength > 0) {
        p5.fill(isDarkMode ? 180 : 200, isDarkMode ? 70 : 60, isDarkMode ? 100 : 90, alpha * (isDarkMode ? 0.6 : 0.5));
      } else {
        p5.fill(isDarkMode ? 10 : 170, isDarkMode ? 80 : 60, isDarkMode ? 100 : 85, alpha * (isDarkMode ? 0.6 : 0.5));
      }
      
      p5.circle(this.position.x, this.position.y, this.radius * 0.2);
      
      // Outer glow
      for (let i = 0; i < 2; i++) {
        p5.fill(isDarkMode ? 180 : 200, isDarkMode ? 70 : 55, isDarkMode ? 100 : 90, alpha * (isDarkMode ? (0.5 - i * 0.2) : (0.4 - i * 0.15)));
        p5.circle(this.position.x, this.position.y, this.radius * (0.3 + i * 0.15));
      }
    }
  }
  
  const updateFlowState = (p5: p5Types, mouseX: number, mouseY: number) => {
    // Calculate mouse velocity
    if (mouseActive) {
      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const newVelocity = Math.sqrt(dx*dx + dy*dy);
      
      // Smooth the velocity for more natural feel
      mouseVelocity = mouseVelocity * 0.8 + newVelocity * 0.2;
      
      // Update last interaction time
      lastInteractionTime = p5.millis();
    }
    
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    
    // Calculate flow intensity based on time since last interaction
    const timeSinceInteraction = p5.millis() - lastInteractionTime;
    const interactionFactor = Math.max(0, 1 - timeSinceInteraction / INTERACTION_MEMORY);
    
    // Flow intensity combines mouse velocity and recent interactions
    const targetFlow = interactionFactor * (0.3 + mouseVelocity * 0.01);
    
    // Smooth the flow transitions
    flowIntensity = flowIntensity * 0.95 + targetFlow * 0.05;
    
    // Update user engagement metric
    userEngagement = Math.max(userEngagement * 0.99, flowIntensity);
    
    // Adjust system parameters based on flow state
    noiseScale = 0.01 + flowIntensity * 0.01;
    noiseStrength = 1 + flowIntensity * 2;
    
    return flowIntensity;
  };
  
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 360, 100, 100, 1);
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(p5, p5.random(p5.width), p5.random(p5.height), i));
    }
    
    // Smooth rendering
    p5.frameRate(60);
    
    // Initial attractor in the center - daha düşük strength değeri
    attractors.push(new Attractor(p5, p5.width/2, p5.height/2, 0.2)); // 0.5 yerine 0.2
  };
  
  const draw = (p5: p5Types) => {
    // Update flow state
    const flowState = updateFlowState(p5, p5.mouseX, p5.mouseY);
    
    // Clear the background with a semi-transparent fill
    // More transparent during flow state for longer trails
    p5.background(
      isDarkMode ? 15 : 250, 
      isDarkMode ? 10 : 250, 
      isDarkMode ? 30 : 255, 
      0.1 - flowState * 0.05
    );
    
    // Create new particles occasionally
    if (p5.frameCount % 20 === 0 && particles.length < 60 + flowState * 40) {
      particles.push(new Particle(p5, p5.random(p5.width), p5.random(p5.height), particles.length));
    }
    
    // Create connections between particles - more during flow
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = p5.dist(
          particles[i].position.x, particles[i].position.y,
          particles[j].position.x, particles[j].position.y
        );
        
        // Create more connections during flow state
        const connectionThreshold = 0.97 - flowState * 0.1;
        if (d < 200 && p5.random(1) > connectionThreshold) {
          connections.push(new Connection(p5, particles[i], particles[j]));
        }
      }
    }
    
    // Update and display attractors
    for (let i = attractors.length - 1; i >= 0; i--) {
      attractors[i].update();
      attractors[i].display(p5);
      
      if (!attractors[i].active) {
        attractors.splice(i, 1);
      }
    }
    
    // Update and display connections
    for (let i = connections.length - 1; i >= 0; i--) {
      connections[i].display(p5, flowState);
      if (connections[i].isDead()) {
        connections.splice(i, 1);
      }
    }
    
    // Update and display particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(p5, flowState);
      particles[i].display(p5, flowState);
      
      if (particles[i].isDead()) {
        particles.splice(i, 1);
      }
    }
    
    // Add visual elements to indicate flow state
    if (flowState > 0.1) {
      // Add subtle glow to the whole canvas during flow
      p5.noStroke();
      p5.fill(isDarkMode ? 200 : 195, isDarkMode ? 50 : 45, isDarkMode ? 100 : 95, flowState * 0.03); // Daha yumuşak tonda glow
      p5.rect(0, 0, p5.width, p5.height);
      
      // Add occasional pulse effects during high flow
      if (flowState > 0.4 && p5.random(1) > 0.95) {
        const x = p5.random(p5.width);
        const y = p5.random(p5.height);
        const size = p5.random(100, 300) * flowState;
        
        p5.noStroke();
        for (let i = 3; i > 0; i--) {
          p5.fill(isDarkMode ? 200 : 195, isDarkMode ? 70 : 50, isDarkMode ? 90 : 85, flowState * 0.1 / i); // Daha yumuşak tonda pulse
          p5.circle(x, y, size * i * 0.6);
        }
      }
    }
  };
  
  const windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };
  
  const mousePressed = (p5: p5Types) => {
    mouseActive = true;
    lastInteractionTime = p5.millis();
    
    // Add attractor where mouse is pressed - daha düşük strength değeri
    const strength = p5.random(0.2, 0.8); // Önceki: (0.5, 1.5)
    const isRepeller = p5.random(1) > 0.7; // Sometimes create repellers
    attractors.push(new Attractor(p5, p5.mouseX, p5.mouseY, strength, isRepeller));
    
    // Add a burst of particles on mouse press during flow state
    if (flowIntensity > 0.3) {
      const burstAmount = Math.floor(5 + flowIntensity * 10);
      for (let i = 0; i < burstAmount; i++) {
        particles.push(new Particle(p5, 
          p5.mouseX + p5.random(-30, 30), 
          p5.mouseY + p5.random(-30, 30),
          particles.length
        ));
      }
    }
  };
  
  const mouseReleased = () => {
    mouseActive = false;
  };
  
  const mouseDragged = (p5: p5Types) => {
    // Create particle trail when dragging
    if (p5.frameCount % 4 === 0) {
      particles.push(new Particle(p5, p5.mouseX, p5.mouseY, particles.length));
    }
    
    // Sometimes add attractor/repeller while dragging - daha düşük strength değeri
    if (p5.random(1) > 0.97) {
      const strength = p5.random(0.1, 0.4); // Önceki: (0.2, 0.8)
      const isRepeller = p5.random(1) > 0.5;
      attractors.push(new Attractor(p5, p5.mouseX, p5.mouseY, strength, isRepeller));
    }
  };
  
  const touchStarted = (p5: p5Types) => {
    mousePressed(p5);
    return false;
  };
  
  const touchMoved = (p5: p5Types) => {
    mouseDragged(p5);
    return false;
  };
  
  const touchEnded = () => {
    mouseReleased();
    return false;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <Sketch 
        setup={setup} 
        draw={draw} 
        windowResized={windowResized}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
        mouseDragged={mouseDragged}
        touchStarted={touchStarted}
        touchMoved={touchMoved}
        touchEnded={touchEnded}
      />
    </div>
  );
};

export default P5Background; 