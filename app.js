const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const tokenChecker = require("./middleware/tokenChecker");
const cheesesRouter = require("./routes/cheeses");
const ratingsRouter = require("./routes/ratings");

const app = express();

app.use(cors())

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// route setup
app.use("/api/tokens", authenticationRouter);
app.use("/api/users", usersRouter);
app.use("/api/ratings", ratingsRouter);
app.use("/api/cheeses", cheesesRouter);

// When in production the backend will forward all requests to the production client, (which doesn't live on a server)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../cheese-frontend/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
