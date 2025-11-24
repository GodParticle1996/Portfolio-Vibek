import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Moon,
  Sun,
  Cpu,
  Mail,
  Globe,
  Phone,
  MapPin,
  Shield,
  Github,
  Network,
  Database,
  Linkedin,
  Download,
  Terminal,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import * as THREE from "three";

const resumeData = {
  personal: {
    name: "Vibek Dutta",
    role: "Solutions Architect | Fullstack Developer",
    location: "Waterloo, ON, CA",
    email: "vibekdutta3096@gmail.com",
    phone: "+1548-577-1180",
    linkedin: "vibekdutta",
    github: "GodParticle1996",
    summary:
      "Root user with 4+ years of uptime. Specializing in architecting scalable distributed systems and cost-efficient cloud infrastructure. Passionate about contributing to the tech community through open-source projects and technical blogs.",
  },
  skills: {
    languages: ["Javascript", "Typescript", "Python", "SQL"],
    frontend: [
      "React.js",
      "Next.js",
      "Framer_Motion",
      "React_Hook_Forms",
      "Tanstack_Query",
      "Redux",
      "Tailwind_CSS",
    ],
    backend: [
      "Node.js",
      "NestJS",
      "GraphQL",
      "gRPC",
      "Redis",
      "Docker",
      "Nginx",
      "Kafka",
    ],
    database: ["Postgres", "Redis", "MongoDB", "AstraDB", "ElasticSearch"],
    devops: [
      "Github_Actions",
      "AWS_Stack",
      "CloudFormation",
      "Grafana",
      "Datadog",
    ],
  },
  experience: [
    {
      company: "Resso.ai",
      role: "Fullstack_Developer",
      location: "Waterloo, CA",
      period: "2024 - Present",
      achievements: [
        "Deployed Visualisation Dashboard (React + NestJS + Drizzle).",
        "Integrated Twilio SMS pipeline for 10k+ daily events.",
        "Engineered RAG pipeline (Python/AstraDB) boosting accuracy by 20%.",
        "Orchestrated zero-downtime CI/CD via GitHub Actions & AWS Fargate.",
        "Hardened security with JWT RBAC & MFA.",
      ],
    },
    {
      company: "Snappymob",
      role: "Software_Engineer",
      location: "Kuala Lumpur, MY",
      period: "2022 - 2023",
      achievements: [
        "Architected scalable microservices (NestJS Monorepo).",
        "Built real-time dashboard (React + TanStack Query).",
        "Optimized state management: Redux -> Zustand (15% bundle reduction).",
        "Implemented CQRS pattern for 20k tx/hour payment system.",
        "Accelerated data ingestion: 23h -> 7h via AWS Step Functions.",
      ],
    },
    {
      company: "Kloudmate",
      role: "Serverless_Dev",
      location: "Bangalore, IN",
      period: "2021 - 2022",
      achievements: [
        "Developed serverless monitoring app (React + GraphQL + Lambda).",
        "Refactored frontend for 40% load time reduction.",
        "Implemented WebSocket sync for 30% engagement boost.",
        "Designed fault-tolerant SQS/DLQ processing with exponential backoff.",
      ],
    },
    {
      company: "Cyborn Ltd.",
      role: "Web_Developer",
      location: "Bangalore, IN",
      period: "2020 - 2020",
      achievements: [
        "Built ANOM dashboard (React + Redux Toolkit).",
        "Integrated Stripe Gateway ($100k+ monthly throughput).",
        "Migrated Neo4j -> AWS RDS (30% latency reduction).",
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

// --- Three.js Cyber Network Background ---
const CyberNetworkBackground = ({ isDark }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    // Deep dark fog for that "endless void" feel
    const fogColor = isDark ? 0x050505 : 0xf0f9ff;
    scene.fog = new THREE.FogExp2(fogColor, 0.0025);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Cyber Nodes (Wireframe Icosahedrons) ---
    const nodeCount = 50;
    const nodes = [];
    const geometry = new THREE.IcosahedronGeometry(0.8, 0); // Geometric tech look
    // Neon material with additive blending for glow
    const material = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00ff88 : 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(geometry, material.clone());
      mesh.position.set(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      // Random rotation speed
      mesh.userData = {
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03,
        },
      };
      scene.add(mesh);
      nodes.push(mesh);
    }

    // --- Connections (Data Lines) ---
    const linesGeometry = new THREE.BufferGeometry();
    const linesMaterial = new THREE.LineBasicMaterial({
      color: isDark ? 0x00ff88 : 0x2563eb,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending, // Glow effect
    });
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // --- Data Packets (Glowing Pulses) ---
    const packetCount = 20;
    const packets = [];
    const packetGeo = new THREE.SphereGeometry(0.25, 4, 4);
    const packetMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xffffff : 0x0ea5e9,
      transparent: true,
      opacity: 0.9,
    });

    for (let i = 0; i < packetCount; i++) {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      scene.add(mesh);
      packets.push({
        mesh,
        pathStart: new THREE.Vector3(),
        pathEnd: new THREE.Vector3(),
        progress: 0,
        speed: 0.01 + Math.random() * 0.03, // Variable speed data
        active: false,
      });
    }

    // --- Animation Loop ---
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Camera drift
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 3 + 10 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      const linePositions = [];
      const connectedPairs = [];

      // Update Nodes
      nodes.forEach((node, i) => {
        // Rotate node itself
        node.rotation.x += node.userData.rotSpeed.x;
        node.rotation.y += node.userData.rotSpeed.y;

        // Move node
        node.position.add(node.userData.velocity);

        // Boundary bounce
        if (Math.abs(node.position.x) > 45) node.userData.velocity.x *= -1;
        if (Math.abs(node.position.y) > 25) node.userData.velocity.y *= -1;
        if (Math.abs(node.position.z) > 25) node.userData.velocity.z *= -1;

        // Find connections
        for (let j = i + 1; j < nodeCount; j++) {
          const nodeB = nodes[j];
          const dist = node.position.distanceTo(nodeB.position);

          if (dist < 18) {
            linePositions.push(
              node.position.x,
              node.position.y,
              node.position.z,
              nodeB.position.x,
              nodeB.position.y,
              nodeB.position.z
            );
            connectedPairs.push({ start: node.position, end: nodeB.position });
          }
        }
      });

      linesGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // Animate Packets
      packets.forEach((packet) => {
        if (!packet.active && connectedPairs.length > 0) {
          const route =
            connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
          packet.pathStart.copy(route.start);
          packet.pathEnd.copy(route.end);
          packet.progress = 0;
          packet.active = true;
          packet.mesh.visible = true;
        }

        if (packet.active) {
          packet.progress += packet.speed;
          packet.mesh.position.lerpVectors(
            packet.pathStart,
            packet.pathEnd,
            packet.progress
          );

          if (packet.progress >= 1) {
            packet.active = false;
            packet.mesh.visible = false;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      packetGeo.dispose();
      packetMat.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 transition-opacity duration-1000 ease-in-out"
    />
  );
};

// --- Terminal Glass Components ---
const TerminalCard = ({ children, className = "", isDark }) => (
  <div
    className={`
    relative overflow-hidden rounded-md border backdrop-blur-md transition-all duration-300 font-mono
    ${
      isDark
        ? "bg-[#0d1117]/70 border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)] text-slate-300 hover:border-green-500/40 hover:bg-[#0d1117]/80"
        : "bg-white/70 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)] text-slate-800 hover:border-blue-500/40 hover:bg-white/80"
    }
    ${className}
  `}
  >
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
        isDark ? "text-green-400" : "text-blue-600"
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
        ? "bg-[#161b22] border-green-500/30 text-green-300 hover:bg-green-500/10"
        : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
    }
    transition-colors cursor-default
  `}
  >
    {text}
  </span>
);

// --- Main App Component ---
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`min-h-screen font-mono transition-colors duration-500 ${
        isDark ? "bg-[#050505] text-slate-300" : "bg-slate-50 text-slate-800"
      }`}
    >
      {/* 3D Cyber Network */}
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
                const sectionName = [
                  "about",
                  "skills",
                  "experience",
                  "education",
                ][index];
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(sectionName)}
                    className={`text-sm hover:underline underline-offset-4 decoration-2 transition-all 
                    ${
                      activeSection === sectionName
                        ? isDark
                          ? "text-green-400 decoration-green-500"
                          : "text-blue-600 decoration-blue-600"
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
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 relative inline-block">
                    {resumeData.personal.name}
                    <span
                      className={`absolute -bottom-2 left-0 w-full h-1 ${
                        isDark ? "bg-green-500" : "bg-blue-600"
                      }`}
                    ></span>
                  </h1>

                  <div className="flex items-center gap-2 text-xl md:text-2xl mt-4">
                    <span className="opacity-50">&gt;</span>
                    <span
                      className={`${
                        isDark ? "text-cyan-400" : "text-cyan-600"
                      }`}
                    >
                      {resumeData.personal.role}
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
                         ? "bg-green-500/10 border-green-500 text-green-400 hover:bg-green-500 hover:text-black"
                         : "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                     }`}
                  >
                    <Terminal size={18} /> ./contact_me.sh
                  </a>
                  <a
                    href="#"
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
                {/* Profile/Avatar Placeholder - stylized as code block */}
                <div
                  className={`aspect-square rounded border-2 border-dashed flex items-center justify-center relative overflow-hidden group
                    ${
                      isDark
                        ? "border-green-500/30 bg-[#161b22]"
                        : "border-blue-500/30 bg-white"
                    }`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                  <img
                    src="/profile.jpg"
                    alt="Vibek Dutta"
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100`}
                  />
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
        <section id="skills" className="mb-32">
          <TerminalHeader title="cat skills.json" icon={Cpu} isDark={isDark} />

          <div className="grid md:grid-cols-2 gap-6">
            <TerminalCard isDark={isDark} className="p-6">
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

            <TerminalCard isDark={isDark} className="p-6">
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

            <TerminalCard isDark={isDark} className="p-6">
              <div className="mb-4">
                <span
                  className={`text-sm font-bold block mb-1 ${
                    isDark ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  // Cloud_Infrastructure
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.devops.map((skill) => (
                  <CodeBadge key={skill} text={skill} isDark={isDark} />
                ))}
              </div>
            </TerminalCard>

            <TerminalCard isDark={isDark} className="p-6">
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
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <TerminalHeader
            title="./work_experience.sh"
            icon={Network}
            isDark={isDark}
          />

          <div className="relative border-l-2 border-dashed ml-4 space-y-12 border-gray-500/30">
            {resumeData.experience.map((job, idx) => (
              <div key={idx} className="relative pl-8">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                    isDark
                      ? "bg-[#0d1117] border-green-500"
                      : "bg-white border-blue-500"
                  }`}
                ></div>

                <TerminalCard
                  isDark={isDark}
                  className="p-8 group hover:-translate-x-1 transition-transform"
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
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-20">
          <TerminalHeader
            title="SELECT * FROM education"
            icon={Database}
            isDark={isDark}
          />
          <div className="grid md:grid-cols-3 gap-6">
            {resumeData.education.map((edu, idx) => (
              <TerminalCard
                key={idx}
                isDark={isDark}
                className="p-6 flex flex-col justify-between hover:scale-[1.02]"
              >
                <div>
                  <div
                    className={`text-xs font-bold mb-2 uppercase tracking-wider ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Degree_0{3 - idx}
                  </div>
                  <h3 className="font-bold mb-2 text-lg">{edu.institution}</h3>
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
          <p className="mt-2">© 2025 Vibek Dutta. All systems operational.</p>
        </footer>
      </main>
    </div>
  );
}
