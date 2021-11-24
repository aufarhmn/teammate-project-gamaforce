var express = require('express');
var router = express.Router();
var path = require('path')
var db = require('../db/db')

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM MissionPlan', (err, rows) =>{
        if(err) {
            console.log(err)
            res.status(500).json({status: 'error'})
            return
          };

        res.json(rows)
    })
})

router.post('/', function(req, res, next) {
  db.run('INSERT INTO MissionPlan(planName, g3wp) VALUES (?, ?)', 
  [req.body.namaMisi, req.body.geoJSON],
  (err) => {
    if(err) {
      console.log(err)
      res.status(500).json({status: 'error'})
      return
    };
    res.status(200).json({status: 'Ok'})
  })
});

router.get('/delete/:id', (req, res, next) => {
      db.run('DELETE FROM MissionPlan WHERE planId = ?',
      [req.params.id],
      (err) => {
        if(err) {
          console.log(err)
          res.status(500).json({status: 'error'})
          return
        };
        res.status(200).json({status: 'Ok'})
        console.log(`Row(s) deleted`);
      })
  })

router.get('/openMission/:id', (req, res, next) => {
      db.run('SELECT * FROM MissionPlan WHERE planId= ?',
      [req.params.id, req.body.namaMisi, req.body.geoJSON],
      /*
      $mission = mysqli_query($conn, $sql) => fetch_assoc();

      $missionGeoJSON = $mission['geoJSON'];
      $missionName = $mission['missionName'];  
      */
      )
})

module.exports = router;

