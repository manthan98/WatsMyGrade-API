import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';

let router = express();

// Connect to database.
initializeDb(db => {
    // Internal middleware.
    router.use(middleware({ config, db }));

    // API routes v1 (/v1).
});

export default router;