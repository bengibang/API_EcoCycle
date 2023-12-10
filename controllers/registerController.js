'use strict';

const firebase = require('../db');
const Register = require('../models/register');
const firestore = firebase.firestore();


const addRegister = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('register').doc().set(data);
        res.send('Registrasi berhasil');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllRegister = async (req, res, next) => {
    try {
        const register = await firestore.collection('register');
        const data = await register.get();
        const registerArray = [];
        if(data.empty) {
            res.status(404).send('No register record found');
        }else {
            data.forEach(doc => {
                const register = new Register(
                    doc.id,
                    doc.data().Nama,
                    doc.data().Email,
                    doc.data().PhoneNumber,
                    doc.data().Password,
                );
                registerArray.push(register);
            });
            res.send(registerArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getRegister = async (req, res, next) => {
    try {
        const id = req.params.id;
        const register = await firestore.collection('register').doc(id);
        const data = await register.get();
        if(!data.exists) {
            res.status(404).send('Register with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateRegister = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const register =  await firestore.collection('register').doc(id);
        await register.update(data);
        res.send('Register record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteRegister = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('register').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addRegister,
    getAllRegister,
    getRegister,
    updateRegister,
    deleteRegister
}