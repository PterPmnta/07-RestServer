export const postUsers = (req, res) => {
    const body = req.body;
    res.json({
        msg: 'POST API - From Controller',
        body: body
    });
};
export const getUsers = (req, res) => {
    const params = req.query;
    res.json({
        msg: 'GET API - From Controller',
        query: params
    });
};
export const putUsers = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'PUT API - From Controller',
        id: id
    });
};
export const patchUsers = (req, res) => {
    res.json({
        msg: 'PATCH API - From Controller'
    });
};
export const deleteUsers = (req, res) => {
    res.json({
        msg: 'DELETE API - From Controller'
    });
};
//# sourceMappingURL=users.controller.js.map