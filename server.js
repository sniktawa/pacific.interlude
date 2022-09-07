const { https } = require("firebase-functions");
const { default: next } = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({
    dev,
    conf: { distDir: ".next" },
});

const handle = app.getRequestHandler();
exports.nextSsrServer = https.onRequest((req, res) =>
    app.prepare().then(() => handle(req, res))
);