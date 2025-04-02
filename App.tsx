import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useIntersectionObserver } from 'react-intersection-observer';
import { 
  Cloud, 
  Container, 
  GitBranch, 
  Server, 
  Terminal, 
  Code2,
  Database,
  LineChart,
  Brain,
  Cpu,
  GraduationCap,
  Briefcase,
  Award,
  Bot,
  ChevronRight
} from 'lucide-react';
import profileImage from './assets/profile.jpg';

const SKILLS = {
  cloud: ['AWS', 'GCP', 'Azure', 'Terraform', 'Ansible'],
  devops: ['Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
  programming: ['Python', 'Bash', 'SQL', 'JavaScript', 'Golang'],
  data: ['Pandas', 'NumPy', 'Apache Airflow', 'MLflow'],
  monitoring: ['Prometheus', 'Grafana', 'CloudWatch']
};

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' }
];

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleScroll = () => {
    const sections = SECTIONS.map(section => {
      const element = document.getElementById(section.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          id: section.id,
          distance: Math.abs(rect.top)
        };
      }
      return { id: section.id, distance: Infinity };
    });

    const closest = sections.reduce((prev, curr) => 
      prev.distance < curr.distance ? prev : curr
    );

    setActiveSection(closest.id);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-950 text-white">
      {/* Navigation Bar */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <ul className="space-y-4">
          {SECTIONS.map(section => (
            <motion.li 
              key={section.id}
              whileHover={{ x: -10 }}
              className="flex items-center justify-end cursor-pointer"
              onClick={() => scrollToSection(section.id)}
            >
              <span className={`text-sm mr-2 ${activeSection === section.id ? 'text-white' : 'text-zinc-500'}`}>
                {section.label}
              </span>
              <div className={`w-2 h-2 rounded-full ${activeSection === section.id ? 'bg-white' : 'bg-zinc-700'}`} />
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950 z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center max-w-4xl relative z-10"
        >
          <div className="mb-8 flex justify-center">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              src={profileImage}
              alt="Vamshi Raju"
              className="w-32 h-32 rounded-full border-2 border-zinc-700 object-cover"
            />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
            Venkata Vamshi Krishnam Raju Mudenuri
          </h1>
          <h2 className="text-2xl text-zinc-400 mb-4">Cloud Engineer & DevOps Specialist</h2>
          <div className="flex justify-center gap-6 mb-8 text-zinc-400">
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              href="mailto:raju38vamsi@gmail.com" 
              className="transition-colors"
            >
              raju38vamsi@gmail.com
            </motion.a>
            <span>|</span>
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              href="tel:2013490808" 
              className="transition-colors"
            >
              (201) 349-0808
            </motion.a>
            <span>|</span>
            <motion.a 
              whileHover={{ scale: 1.05, color: "#fff" }}
              href="https://linkedin.com/in/vamsi-raju" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors"
            >
              LinkedIn
            </motion.a>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-zinc-400 max-w-3xl mx-auto"
          >
            Graduate from UMass Dartmouth specializing in Cloud Engineering, DevOps, and Infrastructure Automation.
            Expert in deploying and managing cloud infrastructure using modern tools and practices.
          </motion.p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-zinc-800">
              <motion.div 
                className="w-full bg-zinc-400"
                style={{ height: scrollYProgress }}
              />
            </div>

            {/* Education */}
            <div id="education">
              <TimelineSection 
                icon={<GraduationCap size={24} />}
                title="Education"
                items={[
                  {
                    title: "University of Massachusetts Dartmouth",
                    subtitle: "Master of Science, Data Science",
                    date: "December 2024",
                    details: "GPA: 3.8/4.0"
                  },
                  {
                    title: "Reva University",
                    subtitle: "Bachelor of Engineering, Electrical and Electronics",
                    date: "May 2022",
                    details: "GPA: 9.2/10.0"
                  }
                ]}
              />
            </div>

            {/* Experience */}
            <div id="experience">
              <TimelineSection 
                icon={<Briefcase size={24} />}
                title="Professional Experience"
                items={[
                  {
                    title: "Graduate Research Assistant",
                    subtitle: "University of Massachusetts Dartmouth",
                    date: "October 2023 - May 2024",
                    details: [
                      "Automated SLURM account provisioning with Terraform and Ansible",
                      "Containerized HPC workloads with Docker",
                      "Implemented CI/CD workflows with GitHub Actions"
                    ]
                  },
                  {
                    title: "Software Engineer Intern",
                    subtitle: "Cognizant",
                    date: "March 2022 - October 2022",
                    details: [
                      "Created ETL pipelines for Azure Blob storage",
                      "Implemented Docker containers with AKS",
                      "Automated CI/CD testing with GitHub Actions"
                    ]
                  }
                ]}
              />
            </div>

            {/* Projects */}
            <div id="projects">
              <TimelineSection 
                icon={<Code2 size={24} />}
                title="Projects"
                items={[
                  {
                    title: "GenBI - Agentic AI for Business Intelligence",
                    subtitle: "AI-Powered Analytics Platform",
                    details: [
                      "Developed Streamlit app with custom agentic AI for intuitive data analysis",
                      "Deployed OpenAI GPT-driven agents for data manipulation and visualization",
                      "Created interactive chat interface with Plotly visualizations",
                      "Implemented natural language querying using pandas and GenAI"
                    ]
                  },
                  {
                    title: "SymptoBot-AI",
                    subtitle: "AI Supported Patient Symptom Checker",
                    details: [
                      "Integrated real-time chat and appointment scheduling",
                      "Reduced scheduling time by 50% using Python and Google Calendar API",
                      "Ensured data security with OAuth 2.0"
                    ]
                  },
                  {
                    title: "Real-time Log Monitoring System",
                    subtitle: "ELK Stack & AWS Implementation",
                    details: [
                      "Built monitoring solution using ELK Stack and CloudWatch",
                      "Developed automated alerts using AWS Lambda",
                      "Improved system reliability by 30%"
                    ]
                  }
                ]}
              />
            </div>

            {/* Skills */}
            <div id="skills" className="relative z-10 bg-zinc-900/50 rounded-xl p-8 backdrop-blur-sm mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkillCard 
                  title="Cloud & Infrastructure"
                  icon={<Cloud size={24} />}
                  skills={SKILLS.cloud}
                />
                <SkillCard 
                  title="DevOps"
                  icon={<Container size={24} />}
                  skills={SKILLS.devops}
                />
                <SkillCard 
                  title="Programming"
                  icon={<Code2 size={24} />}
                  skills={SKILLS.programming}
                />
                <SkillCard 
                  title="Data Engineering"
                  icon={<Database size={24} />}
                  skills={SKILLS.data}
                />
                <SkillCard 
                  title="Monitoring"
                  icon={<LineChart size={24} />}
                  skills={SKILLS.monitoring}
                />
              </div>
            </div>

            {/* Certifications */}
            <div id="certifications">
              <TimelineSection 
                icon={<Award size={24} />}
                title="Certifications"
                items={[
                  {
                    title: "Google Advanced Data Analytics Professional Certificate",
                    subtitle: "Google, Coursera",
                    date: "March 2024"
                  },
                  {
                    title: "Terraform Associate Certification",
                    subtitle: "HashiCorp",
                    date: "In-progress"
                  },
                  {
                    title: "AWS Certified Solutions Architect - Associate",
                    subtitle: "Amazon Web Services",
                    date: "In-progress"
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface TimelineSectionProps {
  icon: React.ReactNode;
  title: string;
  items: {
    title: string;
    subtitle: string;
    date?: string;
    details?: string | string[];
  }[];
}

function TimelineSection({ icon, title, items }: TimelineSectionProps) {
  return (
    <div className="relative z-10 mb-16">
      <div className="flex items-center justify-center mb-8">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="bg-zinc-800 p-3 rounded-full"
        >
          {icon}
        </motion.div>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900/50 rounded-xl p-6 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-zinc-200">{item.title}</h3>
            <h4 className="text-lg text-zinc-400 mb-2">{item.subtitle}</h4>
            {item.date && (
              <p className="text-zinc-500 mb-2">{item.date}</p>
            )}
            {item.details && (
              <ul className="list-disc list-inside text-zinc-400 space-y-1">
                {typeof item.details === 'string' ? (
                  <li>{item.details}</li>
                ) : (
                  item.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))
                )}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

function SkillCard({ title, icon, skills }: SkillCardProps) {
  return (
    <motion.div 
      className="bg-zinc-900/50 rounded-lg p-6 backdrop-blur-sm hover:bg-zinc-800/50 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-4">
        <div className="mr-3 text-zinc-400">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <motion.li 
            key={skill} 
            className="text-zinc-400 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="w-full bg-zinc-800 rounded-full h-2 mr-2">
              <motion.div
                className="bg-zinc-400 h-2 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            {skill}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default App;