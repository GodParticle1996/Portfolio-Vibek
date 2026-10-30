import React, { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Cpu,
  Globe,
  MapPin,
  Github,
  Network,
  Database,
  Linkedin,
  Download,
  Terminal,
  ChevronDown,
} from "lucide-react";
import * as THREE from "three";

const resumeData = {
  personal: {
    name: "Vibek Dutta",
    titles: [
      "Fullstack Developer",
      "Cloud & DevOps Engineer",
      "Node.js | NestJS | React | TypeScript",
      "Go | AWS | Kubernetes | Terraform",
    ],
    location: "Toronto, ON, CA",
    email: "vibekdutta3096@gmail.com",
    phone: "+1548-577-1180",
    linkedin: "vibekdutta",
    github: "GodParticle1996",
    summary:
      "Most of the bugs I've actually enjoyed chasing weren't in the code that broke. They were two or three services upstream from it, hiding behind a stack trace that pointed somewhere completely innocent. I treat misleading errors as clues, tracing logs backward to find where reality broke the code's assumptions. I've worked on syncing state across distributed systems, scaling APIs for massive traffic, and building resilient frontends designed to survive unpredictable user behavior.",
  },
  skills: {
    languages: ["Javascript", "Typescript", "Go", "Python", "SQL", "Solidity"],
    frontend: [
      "React.js",
      "Next.js",
      "Framer_Motion",
      "React_Hook_Form",
      "Tanstack_Query",
      "Apollo_Client",
      "Redux",
      "Zustand",
      "Tailwind_CSS",
    ],
    backend: [
      "Node.js",
      "NestJS",
      "GraphQL",
      "gRPC",
      "Knex.js",
      "Twilio",
      "RabbitMQ",
      "Kafka",
      "Nginx",
    ],
    database: ["Postgres", "MySQL", "Redis", "MongoDB", "AstraDB", "ElasticSearch"],
    devops: [
      "Kubernetes",
      "Helm",
      "Docker",
      "Terraform",
      "Ansible",
      "AWX",
      "CI/CD",
      "Github_Actions",
      "Jenkins",
      "AWS_Stack",
      "CloudFormation",
      "Grafana",
      "Datadog",
    ],
  },
  experience: [
    {
      company: "KPM Power Inc",
      role: "Fullstack_Developer",
      location: "Etobicoke, CA",
      period: "Apr 2026 - Present",
      current: true,
      achievements: [
        "Automating infrastructure & configuration management with Ansible.",
        "Orchestrating Ansible automation at scale through AWX.",
        "Building and maintaining CI/CD pipelines for automated build, test & deploy.",
        "Planning and executing data migration strategies across systems.",
      ],
    },
    {
      company: "Resso.ai",
      role: "Cloud_Engineer",
      location: "Ontario, CA",
      period: "Jul 2025 - Mar 2026",
      achievements: [
        "Built AI recommendation platform (Python, DeepSeek, AstraDB RAG) with Redis context caching, streaming to React via SSE.",
        "Shipped CI/CD with GitHub Actions; deployed on Docker, Kubernetes & Helm.",
        "Automated event-driven workflows on Lambda, SQS & EventBridge, monitored via Grafana & CloudWatch.",
      ],
    },
    {
      company: "Snappymob",
      role: "Software_Engineer",
      location: "Kuala Lumpur, MY",
      period: "Jun 2022 - Feb 2024",
      achievements: [
        "Rebuilt React dashboard: SSE over polling, TanStack Query, Redux -> Zustand (15% bundle reduction).",
        "Implemented CQRS (RabbitMQ + Kafka) with Saga pattern for a 20k tx/hour payment system.",
        "Built ingestion pipelines on Step Functions, Kinesis Firehose & Redshift: 23h -> 7h.",
      ],
    },
    {
      company: "RedSoft Solutions",
      role: "Blockchain_Developer",
      location: "Ahmedabad, IN",
      period: "Nov 2022 - Apr 2023",
      achievements: [
        "Developed NFT marketplace on Polygon (Solidity, Hardhat) with ERC721 assets & ERC1155 perks.",
        "Built Node.js/TypeScript backend with Alchemy & Ethers.js for wallet auth and on-chain event processing.",
        "Integrated Chainlink Price Feeds & VRF; MongoDB change streams for real-time metadata.",
      ],
    },
    {
      company: "KloudMate",
      role: "Fullstack_Web_Developer",
      location: "Bengaluru, IN",
      period: "Jul 2021 - May 2022",
      achievements: [
        "Built React + Apollo frontend with WebSocket sync (30% engagement boost).",
        "Developed AWS Step Functions visualizer (React + D3.js) with X-Ray traces.",
        "Architected log pipeline (CloudWatch, Kinesis, Elasticsearch, Athena) and blue-green ECS releases.",
      ],
    },
    {
      company: "Cyborn Ltd.",
      role: "Fullstack_Web_Developer",
      location: "Bengaluru, IN",
      period: "Aug 2020 - Jun 2021",
      achievements: [
        "Built real-time monitoring dashboards (Angular, RxJS).",
        "Automated Stripe billing with webhooks & retries ($100k+ monthly throughput).",
        "Migrated Neo4j -> AWS RDS PostgreSQL via Python (30% latency reduction).",
      ],
    },
    {
      company: "zekeLabs",
      role: "Deep_Learning_Intern",
      location: "Bengaluru, IN",
      period: "May 2018 - Aug 2018",
      achievements: [
        "Orchestrated ETL workflows on Step Functions, Glue, Athena & S3 data lakes.",
        "Trained PyTorch CNN/LSTM models; containerized ML services with Docker Compose.",
      ],
    },
  ],
  education: [
    {
      institution: "Conestoga College",
      degree: "Grad_Cert: Reporting Systems & DB Dev",
      period: "2024 - 2025",
    },
    {
      institution: "Conestoga College",
      degree: "Grad_Cert: Big Data Solutions Arch",
      period: "2023 - 2024",
    },
    {
      institution: "Rajasthan Tech Univ",
      degree: "B.Tech: Computer Science",
      period: "2016 - 2020",
    },
  ],
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Types each phrase out, holds, deletes it and moves on to the next one
const useTypewriter = (phrases, typeMs = 70, deleteMs = 35, holdMs = 1600) => {
  const [text, setText] = useState(
    prefersReducedMotion() ? phrases[0] : ""
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let index = 0;
    let length = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const phrase = phrases[index];
      length += deleting ? -1 : 1;
      setText(phrase.slice(0, length));

      let delay = deleting ? deleteMs : typeMs;
      if (!deleting && length === phrase.length) {
        deleting = true;
        delay = holdMs;
      } else if (deleting && length === 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
        delay = 400;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, deleteMs, holdMs]);

  return text;
};

// --- Three.js Earth CDN Network Background ---
const CyberNetworkBackground = ({ isDark }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Lighter scene on small screens
    const isMobile = window.innerWidth < 768;
    const quality = isMobile ? 0.4 : 1;

    const scene = new THREE.Scene();
    // Space background
    const bgColor = isDark ? 0x000000 : 0x0a0a1a;
    scene.background = new THREE.Color(bgColor);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;
    camera.position.y = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
    );
    container.appendChild(renderer.domElement);

    // Everything on the globe lives in one group so it spins (and drags) together
    const globe = new THREE.Group();
    scene.add(globe);

    // --- Earth Globe ---
    const earthRadius = 20;
    const earthSegments = isMobile ? 32 : 64;
    const earthGeo = new THREE.SphereGeometry(
      earthRadius,
      earthSegments,
      earthSegments
    );

    // Dark earth material (night side)
    const earthMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0a0a1a : 0x1a1a2e,
      transparent: true,
      opacity: 0.9,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globe.add(earthMesh);

    // Atmosphere glow
    const atmosphereGeo = new THREE.SphereGeometry(
      earthRadius * 1.15,
      earthSegments,
      earthSegments
    );
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00aaff : 0x4a9eff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globe.add(atmosphereMesh);

    // --- CDN Edge Nodes (Glowing Points on Globe) ---
    const nodes = [];

    // One unit sphere + a pair of materials per colour, shared by every node
    const unitGeo = new THREE.SphereGeometry(1, 8, 8);
    const makeNodeMaterials = (color) => ({
      core: new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      }),
      glow: new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      }),
    });
    // Green and greenish-yellow colors
    const greenNodeMats = makeNodeMaterials(isDark ? 0x00ff66 : 0x00ff88);
    const yellowNodeMats = makeNodeMaterials(isDark ? 0xaaff00 : 0xd4ff00);

    // Generate nodes based on population density patterns
    const continents = [
      // North America
      { lat: 40, lon: -100, density: 50 },
      { lat: 35, lon: -80, density: 40 },
      // Europe
      { lat: 50, lon: 10, density: 60 },
      { lat: 45, lon: 25, density: 45 },
      // Asia
      { lat: 35, lon: 110, density: 70 },
      { lat: 22, lon: 88, density: 55 },
      { lat: 1, lon: 103, density: 50 },
      // South America
      { lat: -23, lon: -45, density: 35 },
      // Africa
      { lat: -1, lon: 35, density: 30 },
      // Australia
      { lat: -33, lon: 151, density: 25 },
    ];

    continents.forEach((continent) => {
      const count = Math.max(1, Math.round(continent.density * quality));
      for (let i = 0; i < count; i++) {
        const lat =
          (continent.lat + (Math.random() - 0.5) * 30) * (Math.PI / 180);
        const lon =
          (continent.lon + (Math.random() - 0.5) * 40) * (Math.PI / 180);

        const x = earthRadius * Math.cos(lat) * Math.cos(lon);
        const y = earthRadius * Math.sin(lat);
        const z = earthRadius * Math.cos(lat) * Math.sin(lon);

        const nodeSize = 0.15 + Math.random() * 0.25;
        const mats = Math.random() > 0.6 ? yellowNodeMats : greenNodeMats;

        // Node glow
        const nodeMesh = new THREE.Mesh(unitGeo, mats.core);
        nodeMesh.position.set(x, y, z);
        nodeMesh.scale.setScalar(nodeSize);

        // Outer glow
        const glowMesh = new THREE.Mesh(unitGeo, mats.glow);
        glowMesh.position.set(x, y, z);
        glowMesh.scale.setScalar(nodeSize * 2.5);

        globe.add(nodeMesh);
        globe.add(glowMesh);

        nodes.push({
          mesh: nodeMesh,
          glow: glowMesh,
          size: nodeSize,
          position: new THREE.Vector3(x, y, z),
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    });

    // --- Orbital Data Streams (Curved Lines) ---
    const streamCount = Math.round(80 * quality);
    const streams = [];

    for (let i = 0; i < streamCount; i++) {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      const endNode = nodes[Math.floor(Math.random() * nodes.length)];

      if (startNode === endNode) continue;

      // Create curved path
      const start = startNode.position.clone();
      const end = endNode.position.clone();

      // Control point for curve (higher above surface)
      const mid = start.clone().add(end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      mid.normalize().multiplyScalar(earthRadius + distance * 0.3);

      // Create curve
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);

      const streamGeo = new THREE.BufferGeometry().setFromPoints(points);
      const streamMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x00ffaa : 0x00ff88,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
      });

      const streamLine = new THREE.Line(streamGeo, streamMat);
      globe.add(streamLine);

      streams.push({
        line: streamLine,
        opacity: 0.3,
      });
    }

    // --- Data Packets (Moving along streams) ---
    const packetCount = Math.round(150 * quality);
    const packets = [];

    const packetGeo = new THREE.SphereGeometry(0.2, 6, 6);
    const packetMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xffffff : 0xaaffaa,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    // Tail trail
    const tailGeo = new THREE.SphereGeometry(0.3, 6, 6);
    const tailMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00ff66 : 0x00ff88,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < packetCount; i++) {
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      const tailMesh = new THREE.Mesh(tailGeo, tailMat);

      globe.add(packetMesh);
      globe.add(tailMesh);

      packets.push({
        mesh: packetMesh,
        tail: tailMesh,
        stream: null,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        active: false,
      });
    }

    // --- Star Field ---
    const starCount = isMobile ? 800 : 2000;
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 500;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }

    starsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starsMat = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0xccccff,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);

    // --- Continental Outlines (Subtle lines) ---
    const outlines = [];

    // Simple continental approximations
    const continentalPaths = [
      // North America rough outline
      [
        [40, -125],
        [50, -125],
        [60, -100],
        [50, -70],
        [30, -80],
        [25, -110],
      ],
      // Europe
      [
        [60, -10],
        [70, 20],
        [60, 40],
        [40, 40],
        [35, 10],
        [40, -10],
      ],
      // Asia
      [
        [70, 80],
        [60, 140],
        [20, 140],
        [10, 100],
        [20, 60],
        [50, 70],
      ],
      // Africa
      [
        [35, 10],
        [20, 50],
        [-35, 40],
        [-30, 20],
        [10, 15],
      ],
      // South America
      [
        [10, -80],
        [-10, -70],
        [-35, -60],
        [-55, -70],
        [-40, -75],
        [-10, -80],
      ],
      // Australia
      [
        [-10, 115],
        [-35, 150],
        [-40, 140],
        [-35, 115],
      ],
    ];

    continentalPaths.forEach((path) => {
      const points = path.map(([lat, lon]) => {
        const latRad = lat * (Math.PI / 180);
        const lonRad = lon * (Math.PI / 180);
        return new THREE.Vector3(
          earthRadius * 1.01 * Math.cos(latRad) * Math.cos(lonRad),
          earthRadius * 1.01 * Math.sin(latRad),
          earthRadius * 1.01 * Math.cos(latRad) * Math.sin(lonRad)
        );
      });

      const outlineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const outlineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x003322 : 0x224433,
        transparent: true,
        opacity: 0.3,
      });
      const outlineLine = new THREE.LineLoop(outlineGeo, outlineMat);
      globe.add(outlineLine);
      outlines.push(outlineLine);
    });

    // --- Interaction ---
    let mouseX = 0;
    let mouseY = 0;

    // Drag empty space to spin the globe; it keeps some momentum on release
    const autoSpin = prefersReducedMotion() ? 0 : 0.001;
    let dragging = false;
    let lastX = 0;
    let spin = 0;

    const handleMouseDown = (event) => {
      if (event.target.closest("a, button, nav, [data-card]")) return;
      dragging = true;
      lastX = event.clientX;
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
    };

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      if (dragging) {
        spin = THREE.MathUtils.clamp((event.clientX - lastX) * 0.004, -0.2, 0.2);
        globe.rotation.y += spin;
        lastX = event.clientX;
      }
    };

    const handleMouseUp = () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // --- Animation Loop ---
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Cinematic camera orbit
      camera.position.x += (mouseX * 30 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 30 + 20 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // Rotate Earth slowly (unless it's being dragged)
      if (!dragging) {
        globe.rotation.y += autoSpin + spin;
        spin *= 0.95;
      }

      // Pulse nodes
      nodes.forEach((node) => {
        node.pulsePhase += node.pulseSpeed;
        const pulse = 1 + Math.sin(node.pulsePhase) * 0.3;
        node.mesh.scale.setScalar(node.size * pulse);
        node.glow.scale.setScalar(node.size * 2.5 * pulse * 0.8);
      });

      // Pulse streams randomly
      streams.forEach((stream) => {
        if (Math.random() > 0.98) {
          stream.opacity = 0.6;
        }
        stream.opacity *= 0.95;
        stream.line.material.opacity = Math.max(0.2, stream.opacity);
      });

      // Animate packets
      packets.forEach((packet) => {
        if (!packet.active) {
          const stream = streams[Math.floor(Math.random() * streams.length)];
          packet.stream = stream.line;
          packet.progress = 0;
          packet.active = true;
          packet.mesh.visible = true;
          packet.tail.visible = true;
        }

        if (packet.active && packet.stream) {
          packet.progress += packet.speed;

          const points = packet.stream.geometry.attributes.position;
          const totalPoints = points.count;
          const index = Math.floor(packet.progress * totalPoints);

          if (index < totalPoints - 1) {
            packet.mesh.position.set(
              points.getX(index),
              points.getY(index),
              points.getZ(index)
            );

            const tailIndex = Math.max(0, index - 3);
            packet.tail.position.set(
              points.getX(tailIndex),
              points.getY(tailIndex),
              points.getZ(tailIndex)
            );
          } else {
            packet.active = false;
            packet.mesh.visible = false;
            packet.tail.visible = false;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Don't burn CPU/GPU while the tab is in the background
    const handleVisibility = () => {
      cancelAnimationFrame(frameId);
      if (!document.hidden) animate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      unitGeo.dispose();
      [greenNodeMats, yellowNodeMats].forEach((mats) => {
        mats.core.dispose();
        mats.glow.dispose();
      });
      streams.forEach((stream) => {
        stream.line.geometry.dispose();
        stream.line.material.dispose();
      });
      outlines.forEach((outline) => {
        outline.geometry.dispose();
        outline.material.dispose();
      });
      packetGeo.dispose();
      packetMat.dispose();
      tailGeo.dispose();
      tailMat.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 transition-opacity duration-1000 ease-in-out"
    />
  );
};

// Fades + slides its children in the first time they scroll into view
const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () => prefersReducedMotion() || !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- Terminal Glass Components ---
// `tilt` is the max tilt in degrees; 0 keeps the card flat (spotlight only)
const TerminalCard = ({ children, className = "", isDark, tilt = 0 }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);

    if (tilt && !prefersReducedMotion()) {
      const rotateX = (0.5 - y / rect.height) * tilt * 2;
      const rotateY = (x / rect.width - 0.5) * tilt * 2;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <div
      ref={cardRef}
      data-card
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
    group/card relative overflow-hidden rounded-md border backdrop-blur-md transition-all duration-300 font-mono
    ${
      isDark
        ? "bg-[#0d1117]/70 border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)] text-slate-300 hover:border-green-500/40 hover:bg-[#0d1117]/80 hover:shadow-[0_0_28px_rgba(74,222,128,0.18)]"
        : "bg-white/70 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] text-slate-800 hover:border-blue-500/40 hover:bg-white/80 hover:shadow-[0_0_28px_rgba(59,130,246,0.18)]"
    }
    ${className}
  `}
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), ${
            isDark ? "rgba(74,222,128,0.10)" : "rgba(59,130,246,0.10)"
          }, transparent 70%)`,
        }}
      ></div>
      {/* Terminal Header Bar Strip */}
      <div
        className={`absolute top-0 left-0 w-full h-1 opacity-50 ${
          isDark
            ? "bg-gradient-to-r from-green-500 to-transparent"
            : "bg-gradient-to-r from-blue-500 to-transparent"
        }`}
      ></div>
      {children}
    </div>
  );
};

const TerminalHeader = ({ title, icon: Icon, isDark }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-dashed pb-2 border-opacity-30 border-gray-500">
    <div
      className={`p-2 rounded-md ${
        isDark
          ? "bg-green-500/10 text-green-400"
          : "bg-blue-500/10 text-blue-600"
      }`}
    >
      {Icon && <Icon size={20} />}
    </div>
    <h2
      className={`text-xl font-bold tracking-tight font-mono ${
        isDark
          ? "text-green-400 [text-shadow:0_0_14px_rgba(74,222,128,0.45)]"
          : "text-blue-600"
      }`}
    >
      <span className="opacity-50 mr-2">{">_"}</span>
      {title}
    </h2>
  </div>
);

const CodeBadge = ({ text, isDark }) => (
  <span
    className={`
    px-2 py-1 text-xs rounded border font-mono tracking-wide
    ${
      isDark
        ? "bg-[#161b22] border-green-500/30 text-green-300 hover:bg-green-500/10 hover:shadow-[0_0_10px_rgba(74,222,128,0.35)]"
        : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
    }
    transition-all cursor-default
  `}
  >
    {text}
  </span>
);

const SECTION_IDS = ["about", "skills", "experience", "education"];

// --- Main App Component ---
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const progressRef = useRef(null);
  const title = useTypewriter(resumeData.personal.titles);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Highlight the nav item for the section in the middle of the viewport
  // and drive the scroll progress bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      // The last section can be too short to reach the middle of the viewport
      if (max > 0 && window.scrollY >= max - 4) setActiveSection("education");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`min-h-screen font-mono transition-colors duration-500 ${
        isDark ? "text-slate-300" : "text-slate-800"
      }`}
    >
      {/* 3D Kubernetes Pods Network */}
      <CyberNetworkBackground isDark={isDark} />

      {/* Terminal Navbar */}
      <nav
        className={`
        fixed top-0 w-full z-50 border-b transition-all duration-300
        ${
          isDark
            ? "bg-[#0d1117]/80 border-green-500/20"
            : "bg-white/80 border-blue-500/20"
        }
        backdrop-blur-lg
      `}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-lg font-bold flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("about")}
          >
            <span className={isDark ? "text-green-500" : "text-blue-600"}>
              $
            </span>
            <span className={isDark ? "text-slate-100" : "text-slate-900"}>
              ./vibek_dutta
            </span>
            <span
              className={`animate-pulse ${
                isDark ? "text-green-500" : "text-blue-600"
              }`}
            >
              _
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["~/about", "~/skills", "~/experience", "~/edu"].map(
              (item, index) => {
                const sectionName = SECTION_IDS[index];
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(sectionName)}
                    className={`text-sm hover:underline underline-offset-4 decoration-2 transition-all
                    ${
                      activeSection === sectionName
                        ? isDark
                          ? "text-green-400 underline decoration-green-500"
                          : "text-blue-600 underline decoration-blue-600"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    {item}
                  </button>
                );
              }
            )}
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded border transition-all ${
              isDark
                ? "bg-[#161b22] border-green-500/30 text-yellow-400 hover:border-green-500"
                : "bg-white border-blue-200 text-slate-600 hover:border-blue-400"
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Scroll progress */}
        <div
          ref={progressRef}
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 ${
            isDark
              ? "bg-gradient-to-r from-green-500 to-cyan-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"
              : "bg-gradient-to-r from-blue-600 to-cyan-500"
          }`}
        ></div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <section
          id="about"
          className="min-h-[85vh] flex flex-col justify-center mb-24"
        >
          <TerminalCard isDark={isDark} className="p-8 md:p-12 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-12 items-center mt-4">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <p
                    className={`font-bold mb-2 ${
                      isDark ? "text-green-400" : "text-blue-600"
                    }`}
                  >
                    Hello World! I am
                  </p>

                  {/* Name ASCII Art Style Effect */}
                  <h1
                    className={`text-4xl md:text-6xl font-bold tracking-tight mb-4 relative inline-block ${
                      isDark
                        ? "[text-shadow:0_0_28px_rgba(74,222,128,0.35)]"
                        : ""
                    }`}
                  >
                    {resumeData.personal.name}
                    <span
                      className={`absolute -bottom-2 left-0 w-full h-1 ${
                        isDark
                          ? "bg-green-500 shadow-[0_0_14px_rgba(74,222,128,0.8)]"
                          : "bg-blue-600 shadow-[0_0_14px_rgba(37,99,235,0.5)]"
                      }`}
                    ></span>
                  </h1>

                  <div className="flex items-start gap-2 text-xl md:text-2xl mt-4 min-h-[3.5rem] md:min-h-[2.25rem]">
                    <span className="opacity-50">&gt;</span>
                    <span className="sr-only">
                      {resumeData.personal.titles.slice(0, 2).join(", ")}
                    </span>
                    <span aria-hidden="true">
                      <span
                        className={`${
                          isDark ? "text-cyan-400" : "text-cyan-600"
                        }`}
                      >
                        {title}
                      </span>
                      <span
                        className={`animate-pulse ml-0.5 ${
                          isDark ? "text-green-500" : "text-blue-600"
                        }`}
                      >
                        _
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded border-l-4 ${
                    isDark
                      ? "bg-[#161b22] border-green-500"
                      : "bg-blue-50 border-blue-500"
                  }`}
                >
                  <p className="leading-relaxed opacity-90 font-light">
                    <span className="opacity-50 mr-2">#</span>
                    {resumeData.personal.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={`mailto:${resumeData.personal.email}`}
                    className={`flex items-center gap-2 px-6 py-3 rounded border font-bold transition-all
                     ${
                       isDark
                         ? "bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]"
                         : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                     }`}
                  >
                    <Terminal size={18} /> ./contact_me.sh
                  </a>
                  <a
                    href={`${import.meta.env.BASE_URL}Vibek_Dutta_CV.pdf`}
                    download="Vibek_Dutta_CV.pdf"
                    className={`flex items-center gap-2 px-6 py-3 rounded border transition-colors ${
                      isDark
                        ? "border-gray-700 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Download size={18} /> download_cv
                  </a>
                </div>

                <div className="flex items-center gap-6 text-sm opacity-60 pt-4 font-mono">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} /> "{resumeData.personal.location}"
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe size={14} /> CANADA
                  </span>
                </div>
              </div>

              {/* Stats/Social Column */}
              <div className="flex flex-col gap-6">
                {/* Profile photo in a dashed terminal frame */}
                <div
                  className={`aspect-square rounded border-2 border-dashed flex items-center justify-center relative overflow-hidden group
                    ${
                      isDark
                        ? "border-green-500/30 bg-[#161b22]"
                        : "border-blue-500/30 bg-white"
                    }`}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}profile.jpg`}
                    alt="Vibek Dutta"
                    width="640"
                    height="640"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition duration-500 group-hover:opacity-100 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isDark
                        ? "from-[#0d1117]/70 via-transparent to-transparent"
                        : "from-white/40 via-transparent to-transparent"
                    }`}
                  ></div>
                  <div
                    className={`absolute bottom-2 right-2 text-xs font-bold px-2 py-1 rounded ${
                      isDark
                        ? "bg-green-500 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    SYS_ADMIN
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={`https://github.com/${resumeData.personal.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-4 rounded border flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1
                      ${
                        isDark
                          ? "bg-[#161b22] border-gray-700 hover:border-green-500 text-gray-300 hover:text-green-400"
                          : "bg-white border-gray-200 hover:border-blue-500 text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    <Github size={24} />
                    <span className="text-xs">GitHub</span>
                  </a>
                  <a
                    href={`https://linkedin.com/in/${resumeData.personal.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-4 rounded border flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-1
                      ${
                        isDark
                          ? "bg-[#161b22] border-gray-700 hover:border-blue-400 text-gray-300 hover:text-blue-400"
                          : "bg-white border-gray-200 hover:border-blue-600 text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    <Linkedin size={24} />
                    <span className="text-xs">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </TerminalCard>

          <div className="flex justify-center mt-12 animate-bounce opacity-50">
            <span className={isDark ? "text-green-500" : "text-blue-500"}>
              <ChevronDown size={32} />
            </span>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32 scroll-mt-24">
          <Reveal>
            <TerminalHeader
              title="cat skills.json"
              icon={Cpu}
              isDark={isDark}
            />
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal className="h-full">
              <TerminalCard isDark={isDark} tilt={3} className="p-6 h-full">
                <div className="mb-4">
                  <span
                    className={`text-sm font-bold block mb-1 ${
                      isDark ? "text-pink-400" : "text-pink-600"
                    }`}
                  >
                    // Frontend Architecture
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.frontend.map((skill) => (
                    <CodeBadge key={skill} text={skill} isDark={isDark} />
                  ))}
                </div>
              </TerminalCard>
            </Reveal>

            <Reveal className="h-full" delay={100}>
              <TerminalCard isDark={isDark} tilt={3} className="p-6 h-full">
                <div className="mb-4">
                  <span
                    className={`text-sm font-bold block mb-1 ${
                      isDark ? "text-emerald-400" : "text-emerald-600"
                    }`}
                  >
                    // Backend Microservices
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.backend.map((skill) => (
                    <CodeBadge key={skill} text={skill} isDark={isDark} />
                  ))}
                </div>
              </TerminalCard>
            </Reveal>

            <Reveal className="h-full">
              <TerminalCard isDark={isDark} tilt={3} className="p-6 h-full">
                <div className="mb-4">
                  <span
                    className={`text-sm font-bold block mb-1 ${
                      isDark ? "text-orange-400" : "text-orange-600"
                    }`}
                  >
                    // Cloud_&_DevOps
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.devops.map((skill) => (
                    <CodeBadge key={skill} text={skill} isDark={isDark} />
                  ))}
                </div>
              </TerminalCard>
            </Reveal>

            <Reveal className="h-full" delay={100}>
              <TerminalCard isDark={isDark} tilt={3} className="p-6 h-full">
                <div className="mb-4">
                  <span
                    className={`text-sm font-bold block mb-1 ${
                      isDark ? "text-purple-400" : "text-purple-600"
                    }`}
                  >
                    // Data_Persistence
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.database.map((skill) => (
                    <CodeBadge key={skill} text={skill} isDark={isDark} />
                  ))}
                  {resumeData.skills.languages.map((skill) => (
                    <CodeBadge key={skill} text={skill} isDark={isDark} />
                  ))}
                </div>
              </TerminalCard>
            </Reveal>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32 scroll-mt-24">
          <Reveal>
            <TerminalHeader
              title="./work_experience.sh"
              icon={Network}
              isDark={isDark}
            />
          </Reveal>

          <div className="relative border-l-2 border-dashed ml-4 space-y-12 border-gray-500/30">
            {resumeData.experience.map((job) => (
              <Reveal key={`${job.company}-${job.period}`} className="relative pl-8">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                    isDark
                      ? "border-green-500 " +
                        (job.current ? "bg-green-500" : "bg-[#0d1117]")
                      : "border-blue-500 " +
                        (job.current ? "bg-blue-500" : "bg-white")
                  }`}
                >
                  {job.current && (
                    <span
                      className={`absolute inset-0 rounded-full animate-ping ${
                        isDark ? "bg-green-500/70" : "bg-blue-500/70"
                      }`}
                    ></span>
                  )}
                </div>

                <TerminalCard
                  isDark={isDark}
                  className="p-8 hover:-translate-x-1 transition-transform"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                    <div>
                      <h3
                        className={`text-2xl font-bold ${
                          isDark ? "text-cyan-400" : "text-cyan-700"
                        }`}
                      >
                        {job.role}
                      </h3>
                      <div className="text-lg font-bold mt-1">
                        <span className="opacity-60">@ </span>
                        {job.company}
                      </div>
                    </div>
                    <div className="text-xs font-mono opacity-60 mt-2 md:mt-0 text-right">
                      <div
                        className={`px-2 py-1 rounded inline-block mb-1 ${
                          isDark
                            ? "bg-green-900/30 text-green-400"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {job.period}
                      </div>
                      <div>{job.location}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    {job.achievements.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm opacity-90"
                      >
                        <span
                          className={`mt-1.5 ${
                            isDark ? "text-green-500" : "text-blue-500"
                          }`}
                        >
                          {">"}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </TerminalCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-20 scroll-mt-24">
          <Reveal>
            <TerminalHeader
              title="SELECT * FROM education"
              icon={Database}
              isDark={isDark}
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {resumeData.education.map((edu, idx) => (
              <Reveal key={idx} className="h-full" delay={idx * 100}>
                <TerminalCard
                  isDark={isDark}
                  tilt={4}
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`text-xs font-bold mb-2 uppercase tracking-wider ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      Degree_0{3 - idx}
                    </div>
                    <h3 className="font-bold mb-2 text-lg">
                      {edu.institution}
                    </h3>
                    <p
                      className={`text-sm mb-4 ${
                        isDark ? "text-green-400/80" : "text-blue-600/80"
                      }`}
                    >
                      {edu.degree}
                    </p>
                  </div>
                  <div className="text-xs opacity-40 border-t pt-4 border-dashed border-gray-500/30 font-mono">
                    TIMESTAMP: {edu.period}
                  </div>
                </TerminalCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center opacity-40 text-xs py-12 border-t border-dashed border-gray-500/20 mt-20">
          <p>
            <span className="text-green-500">root@portfolio</span>:
            <span className="text-blue-500">~</span>$ echo "Built with React.js
            & Three.js"
          </p>
          <p className="mt-2 hidden md:block">
            # psst: drag the empty space to spin the globe
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Vibek Dutta. All systems operational.
          </p>
        </footer>
      </main>
    </div>
  );
}
