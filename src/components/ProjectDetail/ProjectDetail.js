import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectDetail = ({ projects }) => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!project) {
    return (
      <motion.section
        className="fade-in"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>Proyecto no encontrado</motion.h2>
          <motion.div variants={itemVariants}>
            <Link to="/" className="button">Volver a la página principal</Link>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  const getProjectDetails = (title) => {
    switch(title) {
      case "Grucar Remolques":
        return "Participé en el desarrollo de un sistema interno para una empresa de grúas, abarcando tanto el diseño de la interfaz como su desarrollo. Implementé varios endpoints para la integración del sistema con la base de datos y otras funcionalidades, utilizando Next.js y TypeScript. Desarrollé funcionalidades backend utilizando Next.js con API Routes y Supabase (PostgreSQL) como base de datos. Colaboré en el diseño de la interfaz del usuario utilizando Tailwind CSS para mejorar la experiencia de usuario.";
      case "FinGuru":
        return "Implementé nuevas características y trabajé en equipo para mejorar la plataforma FinGuru. Utilicé React y TypeScript para el desarrollo frontend, junto con Strapi para el backend y SCSS para los estilos.";
      case "DYDX Bot":
        return "Desarrollé un bot de uso interno que se encargaba de arbitrar tasas de interés de diferentes protocolos DeFi en redes EVM y Cosmos. Utilicé Fastify para el backend, Ethers.js v5 y v6 para interactuar con las blockchains, y trabajé con smart contracts tanto en EVM como en Cosmos.";
      case "Tranqui":
        return "Participé en la creación de una aplicación móvil, desarrollando nuevas características y realizando el mantenimiento de la aplicación. Trabajé en equipo utilizando React, TypeScript, Ionic para el desarrollo móvil, y SCSS para los estilos.";
      default:
        return project.description;
    }
  };

  return (
    <motion.section
      className="fade-in"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        <div className="project-detail">
          <motion.h2 variants={itemVariants}>{project.title}</motion.h2>
          <motion.img 
            src={project.image} 
            alt={project.title} 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p variants={itemVariants}>{getProjectDetails(project.title)}</motion.p>
          <motion.h3 variants={itemVariants}>Tecnologías utilizadas:</motion.h3>
          <motion.ul variants={containerVariants}>
            {project.technologies.map((tech, index) => (
              <motion.li key={index} variants={itemVariants}>{tech}</motion.li>
            ))}
          </motion.ul>
          <motion.div variants={containerVariants}>
            <motion.a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver proyecto
            </motion.a>
            <motion.div 
              variants={itemVariants}
              style={{ display: 'inline-block', marginLeft: '10px' }}
            >
              <Link 
                to="/" 
                className="button"
                style={{ display: 'inline-block' }}
              >
                Volver a la página principal
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectDetail;