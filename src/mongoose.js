import mongoose from 'mongoose';
import logger from './logger';

export default function (app) {
    mongoose
        .connect(app.get('mongodb'), { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
        .catch((err) => {
            logger.error(err);
            process.exit(1);
        });

    mongoose.Promise = global.Promise;

    app.set('mongooseClient', mongoose);
}
