import React, { useEffect, useState } from 'react';
import '@/app/styles/projects.css';
import { Roboto } from 'next/font/google';
interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  timeline: string;
  likes: number;
  isLiked: boolean;
  author: { id: number };
  comments: Comment[];
  showComments?: boolean;
}

interface Comment {
  authorId: number;
  text: string;
}

export default function Projects() {
  // const [projects, setProjects] = useState<Project[]>([]);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Fake Project 1',
      description: 'This is a fake project for testing',
      stack: ['React', 'Next.js', 'TypeScript'],
      timeline: '1 month',
      likes: 3,
      isLiked: false,
      author: { id: 1 },
      comments: [
        { authorId: 1, text: 'Default comment 1' },
        { authorId: 2, text: 'Default comment 2' },
        { authorId: 3, text: 'Default comment 3' },
      ],
    },
    {
      id: '2',
      title: 'Fake Project 2',
      description: 'This is another fake project for testing',
      stack: ['Angular', 'Firebase'],
      timeline: '2 weeks',
      likes: 7,
      isLiked: false,
      author: { id: 1 },
      comments: [],
    },
    {
      id: '3',
      title: 'Fake Project 3',
      description: 'This is a third fake project for testing',
      stack: ['html', 'css'],
      timeline: '3 weeks',
      likes: 1,
      isLiked: false,
      author: { id: 1 },
      comments: [],
    },
  ]);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stack, setStack] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [commentInput, setCommentInput] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3001/project', {
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
    const response = await fetch('http://localhost:3001/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    });
    const newProject = await response.json();
    setProjects((prev) => [...prev, newProject]);
    setPopupOpen(false);
  };

  // TESTING WHETHER PROBLEM IS FRONT- OR BACKEND. EXCLUDE CODE ABOVE WHEN CONNECTING BACK TO BACKEND
  // const handleAddProject = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const projectData = {
  //     id: (projects.length + 1).toString(),
  //     title,
  //     description,
  //     stack,
  //     timeline,
  //     likes: 0,
  //     isLiked: false,
  //     author: { id: 1 },
  //     comments: [],
  //   };
  //   setProjects((prev) => [...prev, projectData]);
  //   setShowAddProjectForm(false);
  // };

  const handleLikeToggle = async (projectId: string) => {
    console.log('like button clicked for project', projectId);
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    const project = projects[projectIndex];

    const method = project.isLiked ? 'DELETE' : 'POST';

    const response = await fetch(
      `http://localhost:3001/project/${projectId}/like`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      console.log('Response object:', response);
      console.log('Response text:', await response.text());

      throw new Error('Failed to like the project');
    }
    const updatedProject = await response.json();

    setProjects((prevProjects) => {
      const updatedProjects = [
        ...prevProjects.slice(0, projectIndex),
        { ...project, likes: updatedProject.likes, isLiked: !project.isLiked },
        ...prevProjects.slice(projectIndex + 1),
      ];
      console.log('updated projects:', updatedProjects);
      return updatedProjects;
    });
  };

  const handleCommentToggle = (projectId: string) => {
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    const project = projects[projectIndex];

    setProjects((prevProjects) => [
      ...prevProjects.slice(0, projectIndex),
      { ...project, showComments: !project.showComments },
      ...prevProjects.slice(projectIndex + 1),
    ]);
  };

  const handleCommentSubmit = async (projectId: string) => {
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );
    const project = projects[projectIndex];

    const commentData: Comment = {
      authorId: 1, // actual author ID
      text: commentInput,
    };
    console.log(projectId);
    console.log(project);
    try {
      const response = await fetch(
        `http://localhost:3001/project/${projectId}/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit the comment');
      }

      const newComment = await response.json();

      setProjects((prevProjects) => [
        ...prevProjects.slice(0, projectIndex),
        { ...project, comments: [...project.comments, newComment] },
        ...prevProjects.slice(projectIndex + 1),
      ]);

      setCommentInput('');
    } catch (error) {
      console.error('An error occurred while submitting the comment:', error);
    }
  };

  // EXCLUDE WHEN BACKEND IS WORKING
  // const handleCommentSubmit = (projectId: string) => {
  //   const projectIndex = projects.findIndex(
  //     (project) => project.id === projectId
  //   );
  //   const project = projects[projectIndex];

  //   const newComment: Comment = {
  //     authorId: 1, // actual author ID
  //     text: commentInput,
  //   };

  //   setProjects((prevProjects) => [
  //     ...prevProjects.slice(0, projectIndex),
  //     { ...project, comments: [...project.comments, newComment] },
  //     ...prevProjects.slice(projectIndex + 1),
  //   ]);

  //   setCommentInput('');
  // };

  return (
    <div className="collaboration-body">
      <div className="add-project-button-container">
        <button
          className="top-right-button"
          onClick={() => setShowAddProjectForm(!showAddProjectForm)}
        >
          {showAddProjectForm ? 'Close' : 'Add Project'}
        </button>
      </div>
      {showAddProjectForm && (
        <div className="popup-background">
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
              <button
                type="button"
                onClick={() => setShowAddProjectForm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="project-wrapper">
        {projects
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((project, index) => {
            return (
              <div
                key={project.id}
                className={`project-item ${
                  index === 0
                    ? 'project-item:first-child'
                    : 'project-item:not(:first-child)'
                }`}
              >
                <div className="project-content">
                  <h2>Project: {project.title}</h2>
                  <p className="project-description">{project.description}</p>
                  <p>Preferred Techstack:</p>
                  <ul>
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <p>Estimated Length: {project.timeline}</p>
                </div>
                <div className="actions-container">
                  <div className="actions-and-comments">
                    <div className="likes-section">
                      <span className="likes-count">{project.likes}</span>
                      <button
                        onClick={() => handleLikeToggle(project.id)}
                        className={`like-button ${
                          project.isLiked ? 'liked' : ''
                        }`}
                      >
                        {project.isLiked ? 'Unlike' : 'Like'}
                      </button>
                    </div>
                    {project.showComments ? null : (
                      <div className="comments-toggle-container">
                        <button
                          className="comments-btn"
                          onClick={() => handleCommentToggle(project.id)}
                        >
                          Comments ({project.comments.length})
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="comments-container">
                    {project.showComments && (
                      <div className="comments-section">
                        <input
                          type="text"
                          className="comments-input"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          placeholder="Add a comment..."
                        />
                        <div className="comment-btn-container">
                          <button
                            className="submit-comment-btn"
                            onClick={() => handleCommentSubmit(project.id)}
                          >
                            Submit
                          </button>
                          <button
                            className="cancel-comment-btn"
                            onClick={() => handleCommentToggle(project.id)}
                          >
                            Cancel
                          </button>
                        </div>
                        <div className="existing-comments">
                          {project.comments.map((comment, index) => (
                            <div key={index} className="comment">
                              <div className="comment-author">
                                User{comment.authorId}
                              </div>
                              <div className="comment-text">{comment.text}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
