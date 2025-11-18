// Sample data for testing the dynamic components
export const sampleProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.',
    repoLink: 'https://github.com/example/ecommerce',
    liveDemo: 'https://ecommerce-demo.com',
    image: 'https://via.placeholder.com/400x200/6366f1/ffffff?text=E-Commerce',
    category: 'web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    featured: true
  },
  {
    _id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    repoLink: 'https://github.com/example/taskmanager',
    liveDemo: 'https://taskmanager-demo.com',
    image: 'https://via.placeholder.com/400x200/ec4899/ffffff?text=Task+Manager',
    category: 'web',
    technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
    featured: true
  },
  {
    _id: '3',
    title: 'Weather Mobile App',
    description: 'A cross-platform mobile weather application with location-based forecasts, weather alerts, and beautiful animations.',
    repoLink: 'https://github.com/example/weather-app',
    liveDemo: '',
    image: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Weather+App',
    category: 'mobile',
    technologies: ['React Native', 'Expo', 'Weather API'],
    featured: false
  },
  {
    _id: '4',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing projects and skills with modern design and smooth animations.',
    repoLink: 'https://github.com/example/portfolio',
    liveDemo: 'https://portfolio-demo.com',
    image: 'https://via.placeholder.com/400x200/10b981/ffffff?text=Portfolio',
    category: 'web',
    technologies: ['React', 'Framer Motion', 'TailwindCSS'],
    featured: false
  },
  {
    _id: '5',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for data visualization with charts, graphs, and real-time data updates.',
    repoLink: 'https://github.com/example/dashboard',
    liveDemo: 'https://dashboard-demo.com',
    image: 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=Dashboard',
    category: 'web',
    technologies: ['React', 'D3.js', 'Chart.js', 'Firebase'],
    featured: true
  },
  {
    _id: '6',
    title: 'Desktop Text Editor',
    description: 'A feature-rich desktop text editor with syntax highlighting, themes, and plugin support.',
    repoLink: 'https://github.com/example/text-editor',
    liveDemo: '',
    image: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Text+Editor',
    category: 'desktop',
    technologies: ['Electron', 'React', 'Monaco Editor'],
    featured: false
  }
];

export const sampleContactInfo = {
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  twitter: 'https://twitter.com/johndoe',
  website: 'https://johndoe.dev'
};

export const sampleSkills = [
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: 'Python', level: 75 },
  { name: 'MongoDB', level: 70 },
  { name: 'PostgreSQL', level: 65 },
  { name: 'AWS', level: 60 },
  { name: 'Docker', level: 55 }
];

export const sampleExperience = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    duration: '2022 - Present',
    description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.'
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    duration: '2020 - 2022',
    description: 'Developed and maintained multiple client projects using modern web technologies.'
  },
  {
    title: 'Frontend Developer',
    company: 'Digital Agency',
    duration: '2019 - 2020',
    description: 'Created responsive and interactive user interfaces for various client websites.'
  }
];