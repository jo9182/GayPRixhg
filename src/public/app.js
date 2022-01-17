if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./gay/sw.js', {scope: './gay/'}).then((reg) => {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
        console.log('Registration failed with ' + error);
    });
} else {
    document.write("install a real browser, retard");
}

document.getElementById("btn").addEventListener('click', async function () {
    let url = document.getElementById("url").value;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        // google doesnt work
        url = "https://search.brave.com/search?q=" + url.replaceAll(" ", "+");
    }
    window.location.href = "/gay/" + btoa(url);
});

