"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorHandling(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "Unexpected error";
    return res.status(status).json({ message: message });
}
exports.default = ErrorHandling;
//# sourceMappingURL=ErrorHandlingMiddleware.js.map