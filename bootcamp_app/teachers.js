require("dotenv").config();

const { Pool } = require('pg');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};

const pool = new Pool(config);

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teachers.name;
`)
  .then(response => {
    response.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));