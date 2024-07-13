(async function () {
    const response = await fetch('http://localhost:3001', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'example' }),
    });
})();
