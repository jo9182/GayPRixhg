use tide;
use tide_rustls::TlsListener;
use surf;
use base64::{encode, decode};
use std::str;
use tide_compress;
use http_types::Method::{Get, Delete, Post, Patch, Put};
use percent_encoding::{percent_decode, percent_encode, NON_ALPHANUMERIC};

async fn get_like(mut req: tide::Request<()>) -> tide::Result {
    let e_url: String = match req.param("url") {
        Ok(url) => match url.parse() {
            Ok(url) => url,
            Err(_) => String::new(),
        },
        Err(_) => String::new(),
    };

    // encoding because base64 alphabet uses a /
    let u_dec: String = percent_decode(e_url.as_bytes()).decode_utf8()?.to_string();

    let mut url: String = match &decode(u_dec) {
        Ok(url) => match str::from_utf8(&url[..]) {
            Ok(url) => url.to_string(),
            Err(_) => String::new(),
        },
        Err(_) => String::new(),
    };

    // sometimes with, for ex, a <form action="" method="get">, the querystring is outside of the b64
    // or its spread across the b64 and outside
    let qs: &str = match req.url().query() {
        Some(qs) => qs,
        None => "",
    };

    if qs != "" {
        if url.contains("?") {
            url.push_str(format!("&{}", qs).as_str());
        } else {
            url.push_str(format!("?{}", qs).as_str());
        }
    }

    if &url[..4] != "http" {
        println!("INVALID URL: {}", url);
        // how do you return early? idfk lets just set the url to some bullshit
        url = "https://blank.org".to_string();
    } 

    // surf doesnt return a result or option for some reason, so when we pass in an invalid URL
    // it will just crash the thread
    let mut req_builder = match req.method() {
        Get => surf::get(url),
        Delete => surf::delete(url),
        Post => {
            let body = surf::http::Body::from_bytes(req.body_bytes().await?);
            surf::post(url).body(body)
        },
        Patch => {
            let body = surf::http::Body::from_bytes(req.body_bytes().await?);
            surf::patch(url).body(body)
        },
        Put => {
            let body = surf::http::Body::from_bytes(req.body_bytes().await?);
            surf::put(url).body(body)
        },
        _ => surf::get(url),
    };

    // Credit: github.com/silvioprog (something something dont reinvent the wheel)
    for (n, v) in req.iter().filter(|(n, _)| (*n != "host" && *n != "accept-encoding")) {
        let v: String = v.iter().map(|s| s.as_str()).collect();
        req_builder = req_builder.header(n, v);
    }
    
    let mut proxy_res = req_builder.send().await?;
    let mut res = tide::http::Response::new(proxy_res.status());
    
    proxy_res.iter().for_each(|(n, v)| {
        res.append_header(n, v);
    });
    
    res.remove_header("content-encoding");

    // TODO (never lol): this in the sw
    let redirect_header_val = match res.header("location") {
        Some(location) => format!("{}{}{}", req.url().origin().ascii_serialization().as_str(),
                        "/gay/",
                        percent_encode(encode(location.as_str()).as_bytes(), NON_ALPHANUMERIC).to_string()),
        None => String::new(),
    };

    if redirect_header_val != String::new() {
        res.remove_header("location");
        res.append_header("location", redirect_header_val);
    }

    let csp_header_val = match res.header("content-security-policy") {
        Some(csp) => str::replace(csp.as_str(), "script-src", "script-src 'unsafe-inline'").to_string(),
        None => String::new(),
    };

    if csp_header_val != String::new() {
        res.remove_header("content-security-policy");
        res.append_header("content-security-policy", csp_header_val);
    }

    if let Some(mime) = proxy_res.content_type() {
        res.set_content_type(mime);
    }
    
    res.set_body(proxy_res.take_body());
    Ok(res.into())
}

async fn listen() -> tide::Result<()> { 
    let mut app = tide::new();
    app.with(tide_compress::CompressMiddleware::new());

    app.at("/").serve_file("./public/index.html").expect("index.html doesn't exist.");
    app.at("/lgbt").serve_dir("./public/").expect("Public directory doesn't exist.");
    app.at("/gay/sw.js").serve_file("./public/sw.js").expect("sw.js doesn't exist.");
    
    app.at("/gay/:url").get(get_like);
    app.at("/gay/:url").post(get_like);
    app.at("/gay/:url").put(get_like);
    app.at("/gay/:url").delete(get_like);
    app.at("/gay/:url").patch(get_like);

    // for some reason shit only works when its in ssl.
    // for testing locally, use chromium flags like 
    // --unsafely-treat-insecure-origin-as-secure --ignore-certificate-errors --temp-profile
    app.listen(
        TlsListener::build()
            .addrs("127.0.0.1:8080")
            .cert("./cert.pem")
            .key("./key.pem"),
    )
    .await.expect("aaa");
    Ok(())
}

#[async_std::main]
async fn main() {
    let _ = listen().await;
}