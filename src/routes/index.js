import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import course from '../controller/course';
import grade from '../controller/grade';
import task from '../controller/task';

let router = express();

// Connect to database.
initializeDb(db => {
    // Internal middleware.
    router.use(middleware({ config, db }));

    // API routes v1 (/v1).
    router.use('/course', course({ config, db }));
    router.use('/grade', grade({ config, db }));
    router.use('/task', task({ config, db }));
});

export default router;