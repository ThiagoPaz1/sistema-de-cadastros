const Schema = require('./schema');

const findDB = async (value) => {
  const valueDB = await Schema.findOne(value);

  return valueDB;
}

const findId = async (id) => {
  const foundId = await Schema.findById(id);

  return foundId;
}

const findAllDB = async () => {
  const all = await Schema.find({});

  return all;
} 

const update = async (id, newValue) => {
  const editEmploye = await Schema.updateOne(id, newValue);
  
  return editEmploye;
}

const employeDelete = async (id) => {
  const deleteEmploye = await Schema.deleteOne(id);

  return deleteEmploye;
}

module.exports = {
  findDB,
  findId,
  findAllDB,
  update,
  employeDelete
}