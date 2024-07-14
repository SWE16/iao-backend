(async function () {
    const response = await fetch('http://localhost:3001/save-map', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'waffle' }),
    });

    let json_res = await response.json();

    console.log(json_res);
})();
