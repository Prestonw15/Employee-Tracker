const express = require('express');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');


const PORT = process.env.PORT || 3015;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// view all departments from an api
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//Add a department
app.post('/api/department', ({ body }, res) => {
    const errors = inputCheck(body, 'department_name');
    if(errors) {
        res.status(400).json({ error: errors });
        return;
    }
    const sql = `Insert Into department (department_name)
                    VALUES (?)`;
    const params = [body.department_name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});


// view all roles
app.get('/api/employeerole', (req, res) => {
    const sql = `SELECT * FROM employeerole`;

    db.query(sql, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Add a role
app.post('/api/employeerole', ({ body }, res) => {
    const errors = inputCheck(body, 'title', 'salary', 'department_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }

    const sql = `INSERT INTO employeerole (title, salary, department_id)
                    VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
  });
