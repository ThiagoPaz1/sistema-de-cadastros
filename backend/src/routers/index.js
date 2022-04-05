const express = require('express');
const router = express.Router();

const controllEmploye = require('../controller/controllEmploye');

router.get('/getEmploye/:name',
  controllEmploye.checkNameParams,
  controllEmploye.getOne
);

router.get('/allEmploye', controllEmploye.getAll);

router.post('/registerEmploye',
  controllEmploye.checkBodyRequest,
  controllEmploye.register
);

router.put('/editEmploye/:id',
  controllEmploye.checkBodyRequestUpdate,
  controllEmploye.update
);

router.delete('/removeEmploye/:id', controllEmploye.remove);

module.exports = router;