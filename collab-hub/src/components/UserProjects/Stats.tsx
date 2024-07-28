// Author : Jainish Patel

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StatsProps {
    count: number;
}

const Stats: React.FC<StatsProps> = ({ count }) => {
    return (
        <Card className="mb-6 bg-white text-gray-800 p-6 shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <CardContent>
                <Typography variant="h5" className="font-bold text-black">
                    Stats
                </Typography>
                <Typography>
                    Total Projects: {count}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Stats;
