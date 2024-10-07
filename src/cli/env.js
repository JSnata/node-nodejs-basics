const parseEnv = () => {
    const rssVars = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'));

    const output = rssVars
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');

    console.log(output);
};

parseEnv();