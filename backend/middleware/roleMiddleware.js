function roleMiddleware(requiredRole) {
    return function (req, res, next) {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                error: "Access denied: Requires role " + requiredRole
            });
        }
        next();
    };
}

module.exports = roleMiddleware;
