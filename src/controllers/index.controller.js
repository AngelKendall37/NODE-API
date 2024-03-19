const mysql = require('mysql');

// Crear conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Usuario de MySQL
    password: '', // Contraseña de MySQL
    database: 'info', // Nombre de la base de datos
    port: 3306 // Puerto de MySQL
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

// Controlador para la tabla users
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Realizar una consulta a la base de datos para encontrar un usuario con el correo electrónico proporcionado
        connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
            if (error) {
                console.error('Error al buscar usuario en la base de datos:', error);
                res.status(500).json({ message: 'Error interno del servidor' });
                return;
            }
            
            // Verificar si se encontró un usuario con el correo electrónico proporcionado
            if (results.length === 0) {
                res.status(401).json({ message: 'Credenciales incorrectas' });
                return;
            }

            // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
            const user = results[0];
            if (password === user.password) {
                // Usuario autenticado correctamente
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                // Credenciales inválidas
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


const getUsers = async (req, res) => {
    try {
        connection.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
            if (error) {
                console.error('Error al obtener usuarios de MySQL:', error);
                res.status(500).json({ message: 'Error al obtener usuarios' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar usuario de MySQL:', error);
            res.status(500).json({ message: 'Error al actualizar usuario' });
            return;
        }
        res.json('User Updated Successfully');
    });
};
const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    connection.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error al obtener usuario de MySQL:', error);
            res.status(500).json({ message: 'Error al obtener usuario' });
            return;
        }
        res.status(200).json(results);
    });
};
const createUsers = async (req, res) => {
    const { id, email, password } = req.body;
d
    if (!id || !email || !password) {
        return res.status(400).json({ message: 'Falta información requerida' });
    }


    connection.query('INSERT INTO users (id, email, password) VALUES (?, ?, ?)', [id, email, password], (error, results) => {
        if (error) {
            console.error('Error al crear usuario en MySQL:', error);
            return res.status(500).json({ message: 'Error al crear usuario' });
        }
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            body: {
                user: { id, email, password }
            }
        });
    });
};


// Controlador para la tabla userInfo
const getUserInfo = async (req, res) => {
    try {
        connection.query('SELECT * FROM userinfo ORDER BY id ASC', (error, results) => {
            if (error) {
                console.error('Error al obtener información de usuario de MySQL:', error);
                res.status(500).json({ message: 'Error al obtener información de usuario' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener información de usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateUserInfo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { userId, name, company } = req.body;

    connection.query('UPDATE userinfo SET user_id = ?, name = ?, company = ? WHERE id = ?', [userId, name, company, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar información de usuario de MySQL:', error);
            res.status(500).json({ message: 'Error al actualizar información de usuario' });
            return;
        }
        res.json('UserInfo Updated Successfully');
    });
};

// Controlador para la tabla documents
const getDocuments = async (req, res) => {
    try {
        connection.query('SELECT * FROM documents ORDER BY id ASC', (error, results) => {
            if (error) {
                console.error('Error al obtener documentos de MySQL:', error);
                res.status(500).json({ message: 'Error al obtener documentos' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener documentos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const createDocument = async (req, res) => {
    const { clientName, documentType, number, date, dueDate, currency, total, status } = req.body;

    connection.query('INSERT INTO documents (clientName, documentType, number, date, dueDate, currency, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [clientName, documentType, number, date, dueDate, currency, total, status], (error, results) => {
        if (error) {
            console.error('Error al crear documento de MySQL:', error);
            res.status(500).json({ message: 'Error al crear documento' });
            return;
        }
        res.json({
            message: 'Document Added successfully',
            body: {
                document: { clientName, documentType, number, date, dueDate, currency, total, status }
            }
        });
    });
};



const deleteDocument = async (req, res) => {
    const id = parseInt(req.params.id);

    connection.query('DELETE FROM documents where id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar documento de MySQL:', error);
            res.status(500).json({ message: 'Error al eliminar documento' });
            return;
        }
        res.json(`Document ${id} deleted Successfully`);
    });
};

const updateDocument = async (req, res) => {
    const id = parseInt(req.params.id);
    const { clientName, documentType, number, date, dueDate, currency, total, status } = req.body;

    connection.query('UPDATE documents SET clientName = ?, documentType = ?, number = ?, date = ?, dueDate = ?, currency = ?, total = ?, status = ? WHERE id = ?', [clientName, documentType, number, date, dueDate, currency, total, status, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar documento en MySQL:', error);
            res.status(500).json({ message: 'Error al actualizar documento' });
            return;
        }
        res.json(`Document ${id} updated successfully`);
    });
};




// Controlador para la tabla Widgets

const getWidgets = async (req, res) => {
    try {
        connection.query('SELECT * FROM widgets ORDER BY id ASC', (error, results) => {
            if (error) {
                console.error('Error al obtener widgets de MySQL:', error);
                res.status(500).json({ message: 'Error al obtener widgets' });
                return;
            }
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error al obtener widgets:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    loginUser,
    getUsers,
    updateUser,
    getUserInfo,
    getUserById,
    updateUserInfo,
    createUsers,
    getDocuments,
    createDocument,
    deleteDocument,
    updateDocument,
    getWidgets
};




