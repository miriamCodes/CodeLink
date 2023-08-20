const handleCommentSubmit = async (projectId: string) => {
  const projectIndex = projects.findIndex(
    (project) => project.id === projectId
  );
  const project = projects[projectIndex];

  const newComment: Comment = {
    authorId: 1, // actual author ID
    text: commentInput,
  };

  const response = await fetch(`/api/projects/${projectId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
  const updatedProject = await response.json();

  setProjects((prevProjects) => [
    ...prevProjects.slice(0, projectIndex),
    { ...updatedProject },
    ...prevProjects.slice(projectIndex + 1),
  ]);

  setCommentInput('');
};
