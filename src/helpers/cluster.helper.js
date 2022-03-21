const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

exports.clusterise = () => {
    const status = { clusterised: false, isMaster: cluster.isMaster };
    if (process.env.CLUSTER == 'YES') {
        status.clusterised = true;
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
        }
    }
    return status;
};
