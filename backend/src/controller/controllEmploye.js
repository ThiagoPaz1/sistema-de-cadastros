const Schema = require('../model/schema');
const queries = require('../model/queries');

const getAll = async (_req, res) => {
  const allEmploye = await queries.findAllDB();

  try {
    return res.status(200).json(allEmploye);
  } catch (error) {
    res.send(error);
  }
}

const checkNameParams = async (req, res, next) => {
  const { name } = req.params;

  if (!name.length) {
    return res.status(400).json({message: "É necessário passar um nome como parâmetro"});
  }

  if (!(await queries.findDB({name: name}))) {
    return res.status(404).json({message: "Colaborador não encontrado."});
  }

  next();
}

const getOne = async (req, res) => {
  const { name } = req.params;

  try {
    const foundEmploye = await queries.findDB({name : name});

    return res.status(200).json(foundEmploye);
  } catch (error) {
    return res.send(error);
  }
}

const checkBodyRequest = async (req, res, next) => {
  const { name, sector } = req.body;

  if (!name.length || !sector.length) {
    return res.status(400).json({message: "Todos os campos devem ser preenchidos."});
  }

  if (name.length < 3) {
    return res.status(400).json({message: "O nome do colaborador deve conter ao menos 3 caracteres."});
  }

  if (await queries.findDB({name: name})) {
    return res.status(400).json({message: "Este colaborador já esta cadastrado"});
  }

  next();
}

const register = async (req, res) => {
  const { name, sector } = req.body;

  const newEmploye = new Schema({
    name: name,
    sector: sector
  });

  try {
    await newEmploye.save();

    return res.status(201).json({message: "Novo colaborador regitrado", newEmploye});
  } catch (error) {
    return res.send(error);
  }
}

const checkBodyRequestUpdate = async (req, res, next) => {
  const { name, sector } = req.body;

  if (!name.length && !sector.length) {
    return res.status(400).json({message: "Ao menos um dos campos deve ser preenchido."});
  }

  if (name.length < 3) {
    return res.status(400).json({message: "O nome do colaborador deve conter ao menos 3 caracteres."});
  }

  next();
}

const update = async (req, res) => {
  const { name, sector } = req.body;
  const { id } = req.params;

  const updateEmploye = {
    name,
    sector
  }

  try {
    await queries.update({_id: id}, updateEmploye);

    return res.status(200).json({message: "Alterações realizadas com sucesso!"});
  } catch (error) {
    return res.status(404).json({message: `ID: ${id}, não encontrado`});
  }
}

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const checkId = await queries.findDB({_id: id});

    await queries.employeDelete({_id: id});

    if (!checkId) {
      return res.status(404).json({message: `ID: ${id}, não encontrado`});  
    } else {
      return res.status(200).json({message: "Cadastro de colaborador removido com sucesso!"});
    }

  } catch (error) {
    return res.status(500).json({message: `Erro no servidor`});
  }
}

module.exports = {
  getAll,
  checkNameParams,
  getOne,
  checkBodyRequest,
  register,
  checkBodyRequestUpdate,
  update,
  remove
}