const parseArgs = () => {
  const clArguments = process.argv;
  const output = clArguments
    .map((arg, i) => {
        if (arg.startsWith('--') && i > 1) {
            return `${arg.replace('--', '')} is ${clArguments[i + 1]}`;
        }
    })
    .filter(item => item).join(', ');
    console.log(output);
};

parseArgs();