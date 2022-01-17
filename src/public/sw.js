function winShitHTML(html, last) {
    // Idea borrowed from 
    return html.replace("</body>", `<script>window.f2KwcD6cDu = "${last}";</script><script>
    navigator.serviceWorker.controller.postMessage(window.f2KwcD6cDu);

    function L4pEa8gKz9NEZGoCyS4ILo8kHQRHcTbofTb0HVDcCTk7vhBple8wg4Z6LA7f2KwcD6cDu(url) {
        if (url.includes("/gay/")) {
            return url;
        }
        let base = window.f2KwcD6cDu.split("/");
        let bUrl = new URL(window.f2KwcD6cDu);
        base.pop();
        base = base.join("/");
        let ret;
        if (url.startsWith("http://") || url.startsWith("https://")) {
            ret = location.origin + "/gay/" + encodeURIComponent(btoa(url));
        } else if (url.startsWith("//")) {
            ret = location.origin + "/gay/" + encodeURIComponent(btoa("https:" + url));
        } else if (url.startsWith("/")) {
            ret = location.origin + "/gay/" + encodeURIComponent(btoa(bUrl.origin + url));
        } else if (url.startsWith("?") || url.startsWith("#")) {
            let du = new URL(document.baseURI);
            ret = du.origin + du.pathname + url;
        } else {
            ret = location.origin + "/gay/" + encodeURIComponent(btoa(base + "/" + url));
        }
        console.log(url + " => " + ret);
        return ret;
    }
    const f2KwcD6cDuattrs = ['src', 'href', 'ping', 'data', 'movie', 'action', 'poster', 'profile', 'background'];
    const f2KwcD6cDudelAttrs = ['http-equiv', 'integrity', 'nonce', 'crossorigin'];
    const f2KwcD6cDussAttrs = ['srcset', 'imagesrcset'];
    
    document.querySelectorAll('*').forEach(function (ele) {
        try {
            f2KwcD6cDuattrs.forEach(function (attr) {
                if (ele.hasAttribute(attr)) {
                    ele.setAttribute(attr, L4pEa8gKz9NEZGoCyS4ILo8kHQRHcTbofTb0HVDcCTk7vhBple8wg4Z6LA7f2KwcD6cDu(ele.getAttribute(attr)));
                }
            });

            f2KwcD6cDudelAttrs.forEach(function (attr) {
                if (ele.hasAttribute(attr)) {
                    ele.removeAttribute(attr);
                }
            });

            f2KwcD6cDussAttrs.forEach(function (attr) {
                if (ele.hasAttribute(attr)) {
                    ele.setAttribute(attr, ele.getAttribute(attr).split(',').map(src => {
                        const parts = src.trimStart().split(' ');
                        if (parts[0]) parts[0] = L4pEa8gKz9NEZGoCyS4ILo8kHQRHcTbofTb0HVDcCTk7vhBple8wg4Z6LA7f2KwcD6cDu(parts[0]);
                        return parts.join(' ');
                    }).join(', '));
                }
            });
        } catch {} 
    });
    
    // concept borrowed ffrom corrosion, aero
    new MutationObserver(mutations => {
        for (let mutation of mutations)
            for (let node of mutation.addedNodes) {
                let stack = [node];
                while (node = stack.pop()) {
                    if (node instanceof Text)
                        continue
        
                    // Attribute rewriting
                    try {
                        f2KwcD6cDuattrs.forEach(function (attr) {
                            if (node.hasAttribute(attr)) {
                                node.setAttribute(attr,  L4pEa8gKz9NEZGoCyS4ILo8kHQRHcTbofTb0HVDcCTk7vhBple8wg4Z6LA7f2KwcD6cDu(node.getAttribute(attr)));
                            }
                        });
        
                        f2KwcD6cDudelAttrs.forEach(function (delAttr) {
                            if (node.hasAttribute(delAttr)) {
                                node.removeAttribute(delAttr);
                            }
                        });
        
                        f2KwcD6cDussAttrs.forEach(function (ssAttr) {
                            if (node.hasAttribute(ssAttr)) {
                                node.setAttribute(ssAttr, node.getAttribute(ssAttr).split(',').map(src => {
                                    const parts = src.trimStart().split(' ');
                                    if (parts[0]) parts[0] = L4pEa8gKz9NEZGoCyS4ILo8kHQRHcTbofTb0HVDcCTk7vhBple8wg4Z6LA7f2KwcD6cDu(parts[0]);
                                    return parts.join(' ');
                                }).join(', '));
                            }
                        });
                    }
                    catch {}
                    
                    if (node.childNodes instanceof NodeList)
                        for (let child of node.childNodes)
                            stack.push(child);
                }
            }
    }).observe(document, {
        childList: true,
        subtree: true
    });
    </script></body>`);
}

function winShitJS(js) {
    // todo: sjit
    return js;
}

//// STOLEN FROM SPERMINALTERMINAL RYAN WILSON (AERO) {

self.addEventListener('install', _ => self.skipWaiting());

// Use the service worker immediately instead of after reload.
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

const ctxs = {};
// Set the server ctx.
self.addEventListener('message', event => ctxs[event.source.id] = event.data);

//// }

async function hR(res, oUrl) {
    let mimeType = res.headers.get('content-type');
    if (mimeType != null && mimeType != undefined) {
        mimeType = mimeType.split(';')[0];
    }

    if (mimeType === 'text/html') {
        let txt = await res.text();
        return new Response(winShitHTML(txt, oUrl), {
            statusText: res.statusText,
            headers: res.headers
        });
    } else {
        return res;
    }
}

// i forgort the eventlistener syntax
self.onfetch = async function(event) {
    var init = { method: event.request.method, mode: event.request.mode };
    if (["POST", "PATCH",  "PUT"].includes(event.request.method)) {
        init.body = event.request.body;
    }
    let rUrl = false;
    try {
        rUrl = new URL(ctxs[event.clientId]);
    } catch {}
    let url;
    if (!event.request.url.includes("/gay/")) {
        if (event.request.url.startsWith(location.origin)) {
            url = location.origin + "/gay/" + encodeURIComponent(btoa(rUrl.origin + event.request.url.replace(location.origin, "")));
        } else if (event.request.url.startsWith("http://") || event.request.url.startsWith("https://")) {
            url = location.origin + "/gay/" + encodeURIComponent(btoa(event.request.url));
        } else if (event.request.url.startsWith("//")) {
            url = location.origin + "/gay/" + encodeURIComponent(btoa("https:" + event.request.url));
        } else if (event.request.url.startsWith("/")) {
            url = location.origin + "/gay/" + encodeURIComponent(btoa(rUrl.origin + event.request.url));
        } else {
            // dont rmbr what this is for
            if (!rUrl) {
                url = location.origin + "/gay/" + encodeURIComponent(btoa(event.request.url));
            } else {
                let srUrl = rUrl.pathname.split("/");
                srUrl.pop();
                url = location.origin + "/gay/" + encodeURIComponent(btoa(rUrl.origin + srUrl.join('/') + '/' + event.request.url));
            }
        }
    } else {
        url = event.request.url;
    }

    // need this for client side rewriting to understand the true url of their page
    let oUrl = atob(decodeURIComponent(url.split("/gay/")[1].split("?")[0]));

    // dont rlly know what navigate is, but you can't set the init obj with it
    if (event.request.mode !== 'navigate') {
        event.respondWith(
            fetch(url, init).then(async (res) => {
                return hR(res, oUrl);
            })
        )
    } else {
        event.respondWith(
            fetch(event.request).then(async (res) => {
                return hR(res, oUrl);
            })
        )
    }
};