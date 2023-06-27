const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize({
  storage: 'base_datos.db',
  dialect: 'sqlite',
  define: {
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    },
  },
});

const Carrera = sequelize.define('carreras', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "nombre" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "nombre" no puede estar vacío'
      }
    }
  },
  lugar: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "lugar" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "lugar" no puede estar vacío'
      }
    }
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "fecha" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "fecha" no puede estar vacío'
      }
    }
  },
  vueltas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "vueltas" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "vueltas" no puede estar vacío'
      }
    }
  },
});

const Piloto = sequelize.define('pilotos', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "nombre" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "nombre" no puede estar vacío'
      }
    }
  },
  escuderia: {
    type: DataTypes.ENUM('Mercedes', 'McLaren', 'Red Bull', 'Aston Martin.', 'Ferrari'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "escudería" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "escudería" no puede estar vacío'
      },
    }
  },
});

const Clasificacion = sequelize.define('clasificaciones', {
  carreraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'carreras',
      key: 'id'
    }
  },
  pilotoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pilotos',
      key: 'id'
    }
  }
});

Carrera.belongsToMany(Piloto, { through: 'clasificaciones', as: 'pilotos', foreignkey: 'carreraId' });
Piloto.belongsToMany(Carrera, { through: 'clasificaciones', as: 'carreras', foreignkey: 'pilotoId' });

app.use(cors());
app.use(bodyParser.json());

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      popular();
      console.log('El servidor está corriendo en el puerto ' + port);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });

//--------------------- EVENTOS ------------------------

app.get('/carreras', async (req, res) => {
  const data = await Carrera.findAll({
    attributes: {
      include: [[sequelize.fn("COUNT", sequelize.literal("DISTINCT pilotos.id")), "cantidadPilotos"]],
    },
    include: [
      {
        model: Piloto,
        as: 'pilotos',
        attributes: [],
        through: { attributes: [] },
      },
    ],
    group: ['carreras.id'],
  })
  res.json(data)
});

app.get('/carreras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unCarrera = await Carrera.findByPk(id, {
      include: [
        {
          model: Piloto,
          as: 'pilotos',
          through: { attributes: [] },
        },
      ],
    });
    if (unCarrera === null) {
      res.status(404).json({ error: `No se encontró carrera con ID ${id}.` });
    } else {
      res.json(unCarrera);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al ejecutar la consulta.' });
  }
});

app.post('/carreras/', async (req, res) => {
  try {
    const unCarrera = await Carrera.build(req.body)
    await unCarrera.validate()
    const unCarreraValidado = await Carrera.create(req.body)
    req.body.pilotos.forEach(async function (unPilotoId) {
      const unPiloto = await Piloto.findByPk(unPilotoId)
      unCarreraValidado.addPiloto(unPiloto)
    })
    res.json({id: unCarreraValidado.id})
  } catch (error) {
    console.error(error);
    res.status(409).json({ errores: error.errors.map(function (e) {return e.message;}) });
  }
});

app.patch('/carreras/:id', async (req, res) => {
  const { id } = req.params;
  const unCarrera = req.body;
  try {
    const [, affectedRows] = await Carrera.update(
      unCarrera,
      { where: { id } }
    );
    if (affectedRows === 0) {
      res.status(404).json({ error: `No se encontró carrera con ID ${id}.` });
    } else {
      await Clasificacion.destroy({
        where: {
          carreraId: id
        }
      })
      const unaCarrera = await Carrera.findByPk(id)
      req.body.pilotos.forEach(async function (unPilotoId) {
        const unPiloto = await Piloto.findByPk(unPilotoId)
        unaCarrera.addPiloto(unPiloto)
      })
      res.json({ id: id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar los datos.' });
  }
});

app.delete('/carreras/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unCarrera = await Carrera.findOne({ where: { id } });
    if (!unCarrera) {
      return res.status(404).json({ error: `No se encontró carrera con ID ${id}.` });
    }
    await unCarrera.destroy();
    res.json('ok');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//--------------------- INVITADOS ------------------------

app.get('/pilotos/', async (req, res) => {
  const { id } = req.params;
  try {
    const unPiloto = await Piloto.findAll()
    res.json(unPiloto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al ejecutar la consulta.' });
  }
});

app.post('/pilotos', async (req, res) => {
  try {
    const unPiloto = await Piloto.build(req.body);
    await unPiloto.validate();
    const unPilotoValidado = await Piloto.create(req.body);
    res.json({id: unPilotoValidado.id});
  } catch (error) {
    console.error(error);
    res.status(409).json({ errores: error.errors.map(function (e) {return e.message;}) });
  }
});

app.delete('/pilotos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unPiloto = await Piloto.findOne({ where: { id } });
    if (!unPiloto) {
      return res.status(404).json({ error: 'Piloto no encontrado' });
    }
    await unPiloto.destroy();
    res.json('ok');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//-------------------------- BBDD ------------------------------

async function popular() {
  const qCarreras = await Carrera.count();
  const qPilotos = await Piloto.count();
  if(qCarreras==0 && qPilotos==0) {
    const puntos = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
    const carreras = [
      { nombre: "Gran Premio de España", lugar: "Catalunya", fecha: new Date("2023-07-15"), vueltas: 66 },
      { nombre: "Gran Premio de Francia", lugar: "Paul Ricard", fecha: new Date("2023-07-22"), vueltas: 53 },
      { nombre: "Gran Premio de Austria", lugar: "Red Bull Ring", fecha: new Date("2023-07-29"), vueltas: 71 },
      { nombre: "Gran Premio de Hungría", lugar: "Hungaroring", fecha: new Date("2023-08-12"), vueltas: 70 },
      { nombre: "Gran Premio de Italia", lugar: "Monza", fecha: new Date("2023-09-03"), vueltas: 53 },
      { nombre: "Gran Premio de Estados Unidos", lugar: "Circuit of The Americas", fecha: new Date("2023-10-15"), vueltas: 56 }
    ];
    const pilotos = [
      { nombre: "Carlos Sainz Jr.", escuderia: "Ferrari" },
      { nombre: "Charles Leclerc",  escuderia: "Ferrari" },
      { nombre: "Daniel Ricciardo", escuderia: "McLaren" },
      { nombre: "Esteban Ocon",     escuderia: "Alpine" },
      { nombre: "George Russell",   escuderia: "Mercedes" },
      { nombre: "Lando Norris",     escuderia: "McLaren" },
      { nombre: "Lewis Hamilton",   escuderia: "Mercedes" },
      { nombre: "Max Verstappen",   escuderia: "Red Bull" },
      { nombre: "Sergio Pérez",     escuderia: "Red Bull" },
      { nombre: "Valtteri Bottas",  escuderia: "Mercedes" },
    ];

    const clasificaciones = [
      { carreraId: 1, pilotoId: 1 },
      { carreraId: 1, pilotoId: 2 },
      { carreraId: 1, pilotoId: 3 },
      { carreraId: 1, pilotoId: 5 },
      { carreraId: 1, pilotoId: 9 },
      { carreraId: 1, pilotoId: 8 },
      { carreraId: 2, pilotoId: 1 },
      { carreraId: 2, pilotoId: 2 },
      { carreraId: 2, pilotoId: 3 },
      { carreraId: 2, pilotoId: 7 },
      { carreraId: 2, pilotoId: 9 },
      { carreraId: 2, pilotoId: 10 },
      { carreraId: 3, pilotoId: 5 },
      { carreraId: 3, pilotoId: 4 },
      { carreraId: 3, pilotoId: 6 },
      { carreraId: 4, pilotoId: 1 },
      { carreraId: 4, pilotoId: 2 },
      { carreraId: 4, pilotoId: 3 },
      { carreraId: 4, pilotoId: 7 },
      { carreraId: 6, pilotoId: 10 },
      { carreraId: 6, pilotoId: 2 },
      { carreraId: 6, pilotoId: 3 },
      { carreraId: 6, pilotoId: 4 },
      { carreraId: 6, pilotoId: 5 },
    ];
    await Carrera.bulkCreate(carreras, { validate: true });
    await Piloto.bulkCreate(pilotos, { validate: true });
    await Clasificacion.bulkCreate(clasificaciones, { validate: true });
  }
}
