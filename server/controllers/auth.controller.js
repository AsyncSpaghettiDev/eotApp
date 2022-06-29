import database from '../database/database.cjs';

export const login = async (req, res) => {
    let auth = false;
    let message = 'User and password must not be empty';
    let statusCode = 400;
    let role = null;

    const { password, user } = req.body;

    if (user && password) {
        const queryString = `SELECT * FROM users WHERE R_USER_NAME='${user}' AND USER_PASSWORD='${password}'`;
        const results = await database.db.promise().query(queryString);
        auth = results[0].length != 0;
        role = auth ? results[0][0].USER_ROLE : null;
        statusCode = auth ? 200 : 404;
        message = auth ? 'Valid credentials' : 'Invalid credentials';

        if (auth) {
            req.session.auth = true;
            req.session.user = user;
            req.session.role = role;
        }
    }
    res.status(statusCode).json({
        auth: auth,
        role: role,
        message: message
    })
}

export const recoverSession = (req, res) => {
    if (req.session.auth)
        res.json({
            auth: req.session.auth,
            user: req.session.user,
            role: req.session.role
        });
    else
        res.json({
            auth: false,
            user: null,
            role: null
        });
}

export const logout = (req, res) => {
    req.session.destroy();
    res.json({
        auth: false,
        user: null,
        role: null
    });
}