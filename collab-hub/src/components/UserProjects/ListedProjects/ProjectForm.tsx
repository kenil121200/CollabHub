import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { Project } from '../../../types/ProjectTypes';

interface NewProjectFormProps {
    onSubmit: (project: Project) => void;
}

const ProjectForm: React.FC<NewProjectFormProps> = ({ onSubmit }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectTechnologies, setProjectTechnologies] = useState('');
    const [projectDomain, setProjectDomain] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProject: Project = {
            projectName,
            projectDescription,
            projectTechnologies,
            projectDomain
            // updatedOn: new Date().toISOString().split('T')[0],
        };
        toast.success("Project added successfull");
        onSubmit(newProject);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                fullWidth
                label="Technologies"
                value={projectTechnologies}
                onChange={(e) => setProjectTechnologies(e.target.value)}
                margin="normal"
                required
            />
            <Box className="flex justify-end mt-4">
                <Button variant="contained" color="primary" type="submit">
                    Upload Project
                </Button>
            </Box>
        </Box>
    );
};

export default ProjectForm;
