export const validatedAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'Must be validated the JWT first'
        });
    }
    if (req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
};
export const haveRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: 'Must be validated the JWT first'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: 'Unauthorized, is neccesary ADMIN_ROLE, SALES_ROLE'
            });
        }
        next();
    };
};
//# sourceMappingURL=role-validator.js.map