export function formatTimeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 60) return 'now';

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo} min${minutesAgo === 1 ? '' : 's'} ago`;

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo} hr${hoursAgo === 1 ? '' : 's'} ago`;

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;

    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 4) return `${weeksAgo} wk${weeksAgo === 1 ? '' : 's'} ago`;

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) return `${monthsAgo} mo${monthsAgo === 1 ? '' : 's'} ago`;

    const yearsAgo = Math.floor(monthsAgo / 12);
    return `${yearsAgo} yr${yearsAgo === 1 ? '' : 's'} ago`;
}
