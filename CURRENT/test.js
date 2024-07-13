(async function () {
    const response = await fetch('http://localhost:3001', {
        method: 'POST',
        body: JSON.stringify({ username: 'example' }),
    });
})();
