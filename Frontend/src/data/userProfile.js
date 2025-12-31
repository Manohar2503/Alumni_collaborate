// User Profile Data with Experience and Skills
export const userProfileData = {
  id: 1,
  name: "Varsha Garapati",
  headline: "Student at Vasireddy Venkatadri Institute of Technology",
  bio: "Passionate about technology and innovation. Open to work opportunities.",
  profileImage: "https://i.pravatar.cc/150?img=1",
  coverImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  location: "Guntur East, Andhra Pradesh, India",
  connections: 194,
  email: "varsha@example.com",
  phone: "+91 9876543210",
  batch: "2024",
  branch: "Computer Science",
  college: "Vasireddy Venkatadri Institute of Technology, Nambur (V), Pedakakani(M), PIN-522508(CC-BQ)",
  
  experience: [
    {
      id: 1,
      jobTitle: "Software Engineer Intern",
      company: "TechCorp Solutions",
      location: "Hyderabad, India",
      startDate: "June 2023",
      endDate: "December 2023",
      description: "Worked on full-stack development projects using React and Node.js. Developed 3 production features and fixed 15+ bugs in the payment module.",
      current: false
    },
    {
      id: 2,
      jobTitle: "Web Developer",
      company: "Digital Innovation Labs",
      location: "Remote",
      startDate: "January 2024",
      endDate: "Present",
      description: "Developing responsive web applications and contributing to open-source projects. Leading frontend development for 2 major client projects.",
      current: true
    },
    {
      id: 3,
      jobTitle: "Technical Intern",
      company: "Acme Corp",
      location: "Bangalore, India",
      startDate: "May 2022",
      endDate: "July 2022",
      description: "Assisted in database optimization and developed REST APIs using Express.js. Improved query performance by 40%.",
      current: false
    }
  ],

  skills: {
    technical: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "HTML/CSS",
      "REST APIs",
      "Git",
      "Python",
      "SQL",
      "Express.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "AWS",
      "Docker"
    ],
    soft: [
      "Communication",
      "Team Collaboration",
      "Problem Solving",
      "Leadership",
      "Time Management",
      "Adaptability",
      "Critical Thinking",
      "Public Speaking",
      "Project Management",
      "Mentoring"
    ]
  },

  education: [
    {
      id: 1,
      school: "Vasireddy Venkatadri Institute of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startDate: "2020",
      endDate: "2024",
      grade: "8.5 CGPA",
      activities: "ACM Student Chapter President, Technical Fest Coordinator, Hackathon Winner"
    },
    {
      id: 2,
      school: "ABC Senior Secondary School",
      degree: "High School",
      field: "Science (Physics, Chemistry, Mathematics)",
      startDate: "2018",
      endDate: "2020",
      grade: "95%",
      activities: "Science Club President, National Olympiad Participant"
    }
  ],

  about: "I'm a passionate full-stack developer with 2+ years of experience building scalable web applications. I love learning new technologies and solving complex problems. Currently working as a Web Developer at Digital Innovation Labs where I lead frontend development for major client projects. My expertise spans React, Node.js, MongoDB, and cloud technologies. I'm open to collaboration and always eager to take on challenging projects that push my boundaries.",
  
  achievements: [
    {
      id: 1,
      text: "🏆 Won 1st Prize in National Hackathon 2023 - Built an AI-powered note-taking app that won hearts of 500+ participants",
      media: []
    },
    {
      id: 2,
      text: "🌟 Published 5 technical articles on Medium with 10k+ total views on web development and React best practices",
      media: []
    },
    {
      id: 3,
      text: "🎯 Led team of 4 developers to deliver 3 major features on time for a fintech startup serving 50k+ users",
      media: []
    }
  ],
};
