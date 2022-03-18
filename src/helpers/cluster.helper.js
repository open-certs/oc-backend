require('dotenv').config({ path: '.env' });

module.exports = function clusterise() {
    if (process.env.cluster == 'yes') {
        const cluster = require('cluster');
        const numCPUs = require('os').cpus().length;

        if (cluster.isMaster) {
            console.log(
                'Starting app in cluster mode with ' + numCPUs + ' workers'
            );
            console.log(`Master is running with pid ${process.pid}`);
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log(
                    `Worker ${process.pid} died with code: ${code} and signal: ${signal}`
                );
                console.log('Starting new worker');
                cluster.fork();
            });

            return { clusterise: true, isMaster: true };
        } else {
            return { clusterise: true, isMaster: false };
        }
    } else {
        return { clusterise: false };
    }
};
