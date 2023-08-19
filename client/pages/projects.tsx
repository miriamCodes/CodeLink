import React, { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';
import '@/app/styles/projects.module.css'

interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  timeline: string;
  votes: number;
  author: { id: number };
}

// const prisma = new PrismaClient();
// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const projects = await prisma.project.findMany({ include: { author: true } });
//     res.json(projects);
//   } else if (req.method === 'POST') {
//     const newProject = await prisma.project.create({ data: req.body });
//     res.json(newProject);
//   } else {
//     res.status(405).end();
//   }
// }

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/projects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddProject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const projectData = { title, description, stack, timeline, authorId: 1 };
    // how does authorId look like? (based on your auth0?)
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    const newProject = await response.json();
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div>
      <div className="add-project-container">
        <form onSubmit={handleAddProject}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="add-project-input"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="add-project-input"
            placeholder="Description"
          />
          <input
            type="text"
            value={stack.join(',')}
            onChange={(e) => setStack(e.target.value.split(','))}
            className="add-project-input"
            placeholder="Stack (comma separated)"
          />
          <input
            type="text"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="add-project-input"
            placeholder="Timeline"
          />
          <button type="submit" className="add-project-btn">
            Add Project
          </button>
        </form>
      </div>
      <div className="project-wrapper">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-item ${
              index === 0
                ? 'project-item:first-child'
                : 'project-item:not(:first-child)'
            }`}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <ul>
              {project.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <p>{project.timeline}</p>
            <p>Votes: {project.votes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
