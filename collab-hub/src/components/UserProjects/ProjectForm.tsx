import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { Project } from '../../types/ProjectTypes';
import axios from 'axios';

interface NewProjectFormProps {
    onSubmit: (project: Project) => void;
}

const ProjectForm: React.FC<NewProjectFormProps> = ({ onSubmit }) => {
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectTechnologies, setProjectTechnologies] = useState<string[]>([]);
    const [projectDomain, setProjectDomain] = useState('');

    const technologyOptions = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java'];
    const domainOptions = ['All', 'Web', 'Mobile', 'AI/ML', 'Data Science', 'Cloud'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("...", projectTechnologies.join(','));
        const newProject: Project = {
            createdByEmail: "jainish@gmail.com",
            projectName,
            projectDescription,
            projectTechnologies: projectTechnologies.join(','),
            projectDomain
        };
        try {
            const response = await axios.post('http://localhost:8081/listedProjects/createNewProject', newProject);
            toast.success("Project added successfully");
            onSubmit(response.data);
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error("Failed to add project");
        }
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
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Technologies</InputLabel>
                <Select
                    multiple
                    value={projectTechnologies}
                    onChange={(event: SelectChangeEvent<typeof projectTechnologies>) => {
                        const value = event.target.value;
                        setProjectTechnologies(typeof value === 'string' ? value.split(',') : value as string[]);
                    }}
                    renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : '')}
                >
                    {technologyOptions.map((tech) => (
                        <MenuItem key={tech} value={tech}>
                            {tech}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Domain</InputLabel>
                <Select
                    value={projectDomain}
                    onChange={(e) => setProjectDomain(e.target.value as string)}
                >
                    {domainOptions.map((domain) => (
                        <MenuItem key={domain} value={domain}>
                            {domain}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box className="flex justify-end mt-4">
                <Button variant="contained" color="primary" type="submit">
                    Upload Project
                </Button>
            </Box>
        </Box>
    );
};

export default ProjectForm;
