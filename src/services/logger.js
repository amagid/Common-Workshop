function info(data) {
    return log("info", data.message, data.status, data.additionalData, data.stack);
}

function warn(data) {
    return log("warn", data.message, data.status, data.additionalData, data.stack);
}

function error(data) {
    return log("error", data.message, data.status, data.additionalData, data.stack);
}

function log(level, message, status, additionalData, stack) {
    const messageObject = { level, message, status };

    console.log(JSON.stringify(messageObject, null, 4));
}

module.exports = {
    info,
    warn,
    error
};