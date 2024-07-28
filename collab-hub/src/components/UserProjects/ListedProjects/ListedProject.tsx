//Author : Jainish Patel

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, useMediaQuery, useTheme, Button, Modal, Typography } from '@mui/material';
import ProjectCard from '../ProjectCard';
import SearchBar from '../SearchBar';
import Stats from '../Stats';
import { Project } from '../../../types/ProjectTypes';
import NewProjectForm from './ProjectForm';
import axios from 'axios';

const ListedProjects: React.FC = () => {
    const theme = useTheme();
    useMediaQuery(theme.breakpoints.down('sm'));
    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState<string>('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchListedProjects = useCallback(async () => {
        try {
            const email = localStorage.getItem("email");
            const response = await axios.post<Project[]>(
                `${process.env.REACT_APP_BACKEND_LINK}/listedProjects/fetchProjects`,
                { "createdByEmail": email }
            );
            setProjects(response.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchListedProjects();
    }, [fetchListedProjects]);

    const addNewProject = () => {
        fetchListedProjects();
        handleClose();
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const filteredProjects = projects.filter(project => {
        const searchQuery = search.toLowerCase();
        return (
            project.projectName.toLowerCase().includes(searchQuery) ||
            project.projectDescription.toLowerCase().includes(searchQuery) ||
            project.projectTechnologies.toLowerCase().includes(searchQuery) ||
            project.projectDomain.toLowerCase().includes(searchQuery)
        );
    });

    return (
        <div className="bg-gray-50 min-h-screen">
            <Box className="container mx-auto px-4 py-6">
                <Box className="bg-white p-4 rounded-md shadow-md mb-6 border border-gray-300">
                    <Grid container spacing={2} className="mb-4" alignItems="center">
                        <Grid item xs={12} md={10}>
                            <SearchBar value={search} onChange={handleSearchChange} />
                        </Grid>
                        <Grid item xs={12} md={2} className="flex justify-end">
                            <Button
                                variant="contained"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                style={{ height: '40px', minWidth: '100px' }}
                                onClick={handleOpen}>
                                Create New
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, index) => (
                                    <ProjectCard key={index} project={project} />
                                ))
                            ) : (
                                <Typography variant="h6" style={{ margin: '20px' }}>
                                    No projects found.
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stats count={projects.length} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className="bg-white p-4 rounded-md shadow-md mx-auto my-6 max-w-lg">
                    <Typography id="modal-title" variant="h6" component="h2">
                        Add New Project
                    </Typography>
                    <NewProjectForm onSubmit={addNewProject} />
                </Box>
            </Modal>
        </div>
    );
};

export default ListedProjects;
