import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import logger from './logger';
import feathers from '@feathersjs/feathers';
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import authentication from './authentication';
import mongoose from './mongoose';

import utils from './utils';
import redis from './redis';

/**
 * Cron jobs
 */
// import ActivateScheduledVideoForInstitute from './cron/ActivateScheduledVideoForInstitute';
// import ScheduledClassAutoTerminate from './cron/ScheduledClassAutoTerminate';
// import LiveClassNotification from './cron/LiveClassNotification';
import StartScheduledExam from './cron/StartScheduledExam';
import EndOnGoingExam from './cron/EndOnGoingExam';
import EndOnGoingStudentExam from './cron/EndOnGoingStudentExam';
import PublishResultOfExam from './cron/PublishResultOfExam';
// import EndOnGoingLiveClass from './cron/EndOnGoingLiveClass';
// import ExamNotification from './cron/ExamNotification';
// import AssignmentNotification from './cron/AssignmentNotification';
// import ExpireOngoingAssignment from './cron/ExpireOngoingAssignment';

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(mongoose);

app.configure(utils);
app.configure(redis);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

/**
 * Cron jobs
 */
// app.configure(ActivateScheduledVideoForInstitute);
// // app.configure(ScheduledClassAutoTerminate);
// app.configure(LiveClassNotification);
app.configure(StartScheduledExam);
app.configure(EndOnGoingExam);
app.configure(EndOnGoingStudentExam);
app.configure(PublishResultOfExam);
// app.configure(EndOnGoingLiveClass);
// app.configure(ExamNotification);
// app.configure(AssignmentNotification);
// app.configure(ExpireOngoingAssignment);

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

export default app;
