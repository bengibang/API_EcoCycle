const express = require('express');
const {addRegister, 
       getAllRegister, 
       getRegister,
       updateRegister,
       deleteRegister
      } = require('../controllers/registerController');

const router = express.Router();

router.post('/register', addRegister);
router.get('/registers', getAllRegister);
router.get('/register/:id', getRegister);
router.put('/register/:id', updateRegister);
router.delete('/register/:id', deleteRegister);


module.exports = {
    routes: router
}