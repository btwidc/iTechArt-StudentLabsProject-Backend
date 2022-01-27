"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandling(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "Unexpected error";
    return res.status(status).json({ message: message });
}
exports.default = errorHandling;
//# sourceMappingURL=errorHandlingMiddleware.js.map