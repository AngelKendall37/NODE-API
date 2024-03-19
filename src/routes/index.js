const { Router } = require('express');
const router = Router();

const { loginUser, getUsers, updateUser, getUserById, createUsers, getUserInfo, updateUserInfo, getWidgets, getDocuments, 
    createDocument, deleteDocument,updateDocument } = require('../controllers/index.controller');

// Rutas para users
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.get('/userbyid', getUserById);
router.post('/createusers', createUsers);
// Rutas para users
router.get('/userinfo', getUserInfo);
router.put('/usersinfo/:id', updateUserInfo);

// Rutas para widgets
router.get('/widgets', getWidgets);

// Rutas para documents
router.get('/documents', getDocuments);
router.post('/createdocuments', createDocument);
router.delete('/documents/:id', deleteDocument);
router.put('/documents/:id', updateDocument);

module.exports = router;

