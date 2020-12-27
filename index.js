const execa = require('execa');
const npmRunPath = require('npm-run-path');

module.exports = function snowpackPluginRescript(
  snowpackConfig,
  _pluginOptions,
) {
  return {
    name: 'snowpack-plugin-rescript',
    async run({ isDev, log }) {
      const execPromise = execa.command(
        `bsb -make-world -clean-world ${isDev ? '-w' : ''}`,
        {
          env: npmRunPath.env(),
          extendEnv: true,
          windowsHide: false,
          cwd: snowpackConfig.root || process.cwd(),
        },
      );

      const { stdout, stderr } = execPromise;
      function onData(chunk) {
        let stdOutput = chunk.toString();

        // handle the ">>>>" character to clear output in watch mode
        if (stdOutput.includes('>>>>')) {
          log('WORKER_RESET', {});
          stdOutput = stdOutput.replace('>>>>', '');
        }

        log('WORKER_MSG', { level: 'log', msg: stdOutput });
      }

      stdout && stdout.on('data', onData);
      stderr && stderr.on('data', onData);

      return execPromise;
    },
  };
};
