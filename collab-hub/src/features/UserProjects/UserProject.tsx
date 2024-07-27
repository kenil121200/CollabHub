import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import ListedProjects from '../../components/UserProjects/ListedProjects/ListedProject';
import ContributedProjects from '../../components/UserProjects/ContributedProjects/ContributedProjects';

const UserProjects: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <div>
            <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab label="Listed Projects" />
                <Tab label="Contributed Projects" />
            </Tabs>
            {selectedTab === 0 && <ListedProjects />}
            {selectedTab === 1 && <ContributedProjects />}
        </div>
    );
};

export default UserProjects;
