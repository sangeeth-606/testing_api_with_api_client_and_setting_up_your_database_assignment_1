const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const PORT = 3467 ;
const studentData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (threshold === undefined || typeof threshold !== 'number') {
     res.send({ error: "'invalid input" });
  }

  const filteredStudents = studentData.filter((student) => student.total > threshold);


  res.json({
    count: filteredStudents.length,
    students: filteredStudents,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

