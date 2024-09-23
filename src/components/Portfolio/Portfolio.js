import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import './Portfolio.css';

const projectsData = [
    {
        id: 1,
        title: "Grucar Remolques",
        description: "Sistema interno para empresa de grúas",
        image: "/grucar.png",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
        link: "#"
    },
    {
        id: 2,
        title: "FinGuru",
        description: "Desarrollo de nuevas características",
        image: "/grucar.png",
        technologies: ["React", "TypeScript", "Strapi", "SCSS"],
        link: "#"
    },
    {
        id: 3,
        title: "DYDX Bot",
        description: "Bot de arbitraje para tasas de interés DeFi",
        image: "/grucar.png",
        technologies: ["Fastify", "Ethers.js", "Smart contracts (EVM y Cosmos)"],
        link: "#"
    },
    {
        id: 4,
        title: "Tranqui",
        description: "Desarrollo de app móvil",
        image: "/grucar.png",
        technologies: ["React", "TypeScript", "Ionic", "SCSS"],
        link: "#"
    },
];

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 50 && rect.bottom >= 50;
                }
                return false;
            });
            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const handleHomeClick = () => {
        const element = document.getElementById('home');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    

    return (
        <Router>
            <div>
                <motion.nav
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <ul>
                        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/"
                                onClick={handleHomeClick}
                                className={`cursor-pointer ${activeSection === 'home' ? 'active' : ''}`}
                            >
                                Home
                            </Link>
                        </motion.li>
                        {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                            <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <ScrollLink
                                    to={item.toLowerCase()}
                                    smooth={true}
                                    duration={500}
                                    className={`cursor-pointer ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                                >
                                    {item}
                                </ScrollLink>
                            </motion.li>
                        ))}
                    </ul>
                </motion.nav>

                <Routes>
                    <Route path="/project/:id" element={<ProjectDetail projects={projectsData} />} />
                    <Route path="/" element={
                        <>
                            <motion.section
                                id="home"
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                            >
                                <div className="container">
                                    <motion.h1 variants={itemVariants}>Celiz Ramos Matías Nicolás</motion.h1>
                                    <motion.p variants={itemVariants}>Junior Full Stack Developer</motion.p>
                                </div>
                            </motion.section>

                            <motion.section
                                id="about"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={containerVariants}
                            >
                                <div className="container">
                                    <motion.h2 variants={itemVariants}>Sobre mí</motion.h2>
                                    <motion.p variants={itemVariants}>Soy un desarrollador Full Stack Junior con experiencia en una variedad de tecnologías modernas. Me apasiona crear soluciones digitales innovadoras y eficientes.</motion.p>
                                </div>
                            </motion.section>

                            <motion.section
                                id="skills"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={containerVariants}
                            >
                                <div className="container">
                                    <motion.h2 variants={itemVariants}>Habilidades</motion.h2>
                                    <motion.ul variants={containerVariants}>
                                        {[
                                            "JavaScript, TypeScript, C++, Java, Python",
                                            "React, Next.js, Ionic",
                                            "Node.js, Fastify",
                                            "MySQL, PostgreSQL, Supabase",
                                            "Git, Github",
                                            "HTML, CSS, SCSS, Tailwind CSS"
                                        ].map((skill, index) => (
                                            <motion.li key={index} variants={itemVariants}>{skill}</motion.li>
                                        ))}
                                    </motion.ul>
                                </div>
                            </motion.section>

                            <motion.section
                                id="projects"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={containerVariants}
                            >
                                <div className="container">
                                    <motion.h2 variants={itemVariants}>Proyectos</motion.h2>
                                    <motion.div className="projects-grid" variants={containerVariants}>
                                        {projectsData.map((project) => (
                                            <motion.div key={project.id} variants={itemVariants}>
                                                <Link to={`/project/${project.id}`} className="project-card">
                                                    <motion.img
                                                        src={project.image}
                                                        alt={project.title}
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ duration: 0.3 }}
                                                    />
                                                    <h3>{project.title}</h3>
                                                    <p>{project.description}</p>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>
                            </motion.section>

                            <motion.section
                                id="contact"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={containerVariants}
                            >
                                <div className="container">
                                    <motion.h2 variants={itemVariants}>Contacto</motion.h2>
                                    <motion.p variants={itemVariants}>¿Interesado en trabajar juntos? ¡Contáctame!</motion.p>
                                    <motion.p variants={itemVariants}>Teléfono: +52 223 542 1371</motion.p>
                                    <motion.p variants={itemVariants}>Email: maticelizramos@gmail.com</motion.p>
                                    <motion.a
                                        href="https://www.linkedin.com/in/celizm/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="button"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        LinkedIn
                                    </motion.a>
                                </div>
                            </motion.section>
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default Portfolio;