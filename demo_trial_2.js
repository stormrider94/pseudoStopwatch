function formatMilliseconds(ms) {
    const hours = Math.floor(ms / (60 * 60 * 1000));
    ms %= 60 * 60 * 1000;
    const minutes = Math.floor(ms / (60 * 1000));
    ms %= 60 * 1000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

const formattedTime = formatMilliseconds(949493);
console.log(formattedTime);  // 0:15:49:493
