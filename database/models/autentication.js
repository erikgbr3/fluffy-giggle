import db from "./index"

export const checkUserEmailPassword = async( _email, password) => {
    
    const user = await db.Usuarios.findOne({ where: {email: _email} });

    if (!user) {
        return null;
    }

    if (!user.isValidPassword(password)) {
        return null;
    }

    const {
        id,
        username,
        email,
        roleId
    } = user;

    return {
        id,
        username,
        email,
        roleId
    }
}