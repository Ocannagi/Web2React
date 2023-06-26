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

const Evento = sequelize.define('eventos', {
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
  organizador: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "organizador" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "organizador" no puede estar vacío'
      }
    }
  },
  contacto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "contacto" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "contacto" no puede estar vacío'
      },
      isEmail: true,
    }
  },

});

const Invitado = sequelize.define('invitados', {
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
  contacto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'El campo "contacto" no puede ser nulo'
      },
      notEmpty: {
        msg: 'El campo "contacto" no puede estar vacío'
      },
      isEmail: true,
    }
  },
  confirmado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    validate: {
      isIn: {
        args: [[0, 1, false, true]],
        msg: 'El campo "confirmado" debe ser una de las siguientes opciones: 1 / true (=verdadero) ó 0 / false (=falso)'
      }
    }
  },
});

Evento.hasMany(Invitado, { as: 'invitados' });
Invitado.belongsTo(Evento, { as: 'evento' });

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

app.get('/eventos', async (req, res) => {
  const data = await Evento.findAll({
    attributes: {
      include: [[Sequelize.fn("COUNT", Sequelize.col("invitados.id")), "cantidadInvitados"]] 
    },
    include: [
      { model: Invitado, attributes: [], as: 'invitados' }
    ],
    group: ['eventos.id'],
  })
  res.json(data)
});

app.get('/eventos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unEvento = await Evento.findByPk(id, {
      include: 'invitados',
      attributes: {
        exclude: ['eventoId']
      },
    });
    if (unEvento === null) {
      res.status(404).json({ error: `No se encontró el evento con ID ${id}.` });
    } else {
      res.json(unEvento);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al ejecutar la consulta.' });
  }
});

app.post('/eventos/', async (req, res) => {
  try {
    const unEvento = await Evento.build(req.body);
    await unEvento.validate();
    const unEventoValidado = await Evento.create(req.body);
    res.json({id: unEventoValidado.id});
  } catch (error) {
    console.error(error);
    res.status(409).json({ errores: error.errors.map(function (e) {return e.message;}) });
  }
});

app.patch('/eventos/:id', async (req, res) => {
  const { id } = req.params;
  const unEvento = req.body;
  
  try {
    const [, affectedRows] = await Evento.update(
      unEvento,
      { where: { id } }
    );
    if (affectedRows === 0) {
      res.status(404).json({ error: `No se encontró el evento con ID ${id}.` });
    } else {
      res.json({ id: id });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al actualizar los datos.' });
  }
});

app.delete('/eventos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unEvento = await Evento.findOne({ where: { id } });
    if (!unEvento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    await unEvento.destroy();
    res.json('ok');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//--------------------- INVITADOS ------------------------

app.get('/invitados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unInvitado = await Invitado.findByPk(id, {
      include: 'evento'
    });
    if (unInvitado === null) {
      res.status(404).json({ error: `No se encontró la invitado con ID ${id}.` });
    } else {
      res.json(unInvitado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al ejecutar la consulta.' });
  }
});

app.post('/invitados', async (req, res) => {
  try {
    const unInvitado = await Invitado.build(req.body);
    await unInvitado.validate();
    const unInvitadoValidado = await Invitado.create(req.body);
    res.json({id: unInvitadoValidado.id});
  } catch (error) {
    console.error(error);
    res.status(409).json({ errores: error.errors.map(function (e) {return e.message;}) });
  }
});

app.delete('/invitados/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const unInvitado = await Invitado.findOne({ where: { id } });
    if (!unInvitado) {
      return res.status(404).json({ error: 'Invitado no encontrado' });
    }
    await unInvitado.destroy();
    res.json('ok');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//-------------------------- BBDD ------------------------------

async function popular() {
  const qEventos = await Evento.count();
  const qInvitados = await Invitado.count();
  if(qEventos==0 && qInvitados==0) {
    const eventos = [
      { nombre: 'Mundial de esquí', lugar: 'San Carlos de Bariloche', fecha: new Date('2023-07-15T10:00:00'), organizador: 'Comité mundial de esquí', contacto: 'worldcup@wsc.com'},
      { nombre: 'Conferencia de tecnología', lugar: 'Ciudad de México', fecha: new Date('2023-09-20T14:30:00'), organizador: 'TechCon', contacto: 'info@techcon.com' },
      { nombre: 'Feria de arte', lugar: 'París', fecha: new Date('2023-08-10T11:00:00'), organizador: 'Museo de Arte Moderno', contacto: 'contacto@museoarte.com' },
      { nombre: 'Festival de música', lugar: 'Londres', fecha: new Date('2023-06-25T19:30:00'), organizador: 'MusicFest', contacto: 'info@musicfest.com' },
      { nombre: 'Exposición de fotografía', lugar: 'Nueva York', fecha: new Date('2023-10-05T13:00:00'), organizador: 'Galería de Arte Contemporáneo', contacto: 'galeriaarte@ny.com' },
    ];
    const invitados = [
      { nombre: "Juan Pérez", contacto: "juan@example.com", confirmado: true, eventoId: 1 },
      { nombre: "María López", contacto: "maria@example.com", confirmado: false, eventoId: 2 },
      { nombre: "Carlos Rodríguez", contacto: "carlos@example.com", confirmado: true, eventoId: 3 },
      { nombre: "Ana Gómez", contacto: "ana@example.com", confirmado: true, eventoId: 4 },
      { nombre: "Luisa Fernández", contacto: "luisa@example.com", confirmado: false, eventoId: 5 },
      { nombre: "Pedro Ramírez", contacto: "pedro@example.com", confirmado: true, eventoId: 2 },
      { nombre: "Laura Torres", contacto: "laura@example.com", confirmado: true, eventoId: 3 },
      { nombre: "Manuel Sánchez", contacto: "manuel@example.com", confirmado: false, eventoId: 4 },
      { nombre: "Marta Vargas", contacto: "marta@example.com", confirmado: true, eventoId: 1 },
      { nombre: "Andrés Castro", contacto: "andres@example.com", confirmado: true, eventoId: 5 },
      { nombre: "Gabriela Ríos", contacto: "gabriela@example.com", confirmado: false, eventoId: 3 },
      { nombre: "Sergio Mendoza", contacto: "sergio@example.com", confirmado: true, eventoId: 4 },
      { nombre: "Valeria Rojas", contacto: "valeria@example.com", confirmado: false, eventoId: 1 },
      { nombre: "Roberto Núñez", contacto: "roberto@example.com", confirmado: true, eventoId: 2 },
      { nombre: "Fernanda Silva", contacto: "fernanda@example.com", confirmado: true, eventoId: 3 },
      { nombre: "Hugo Díaz", contacto: "hugo@example.com", confirmado: false, eventoId: 4 }
    ];
    Evento.bulkCreate(eventos, { validate: true });
    Invitado.bulkCreate(invitados, { validate: true });
  }
}