const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

// access config var
process.env.TOKEN_SECRET;

const PORT = process.env.PORT || 3000;

const TOKEN_SECRET =
  'a47d2d38f338535def52568080d0b9cdf4358ca854d577c42bdf857398810e737479d01cb4f63615e1051f4e71c1c1b41f7a6a37f11497439e4726e97627f509';

function generateAccessToken(payload) {
  return jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: '12h',
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // if (token == null) return res.sendStatus(401);

  if (token == null) {
    response.status = 401;
    response.message = 'Unauthorized';
    res.send(response);
  } else {
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      res.write;
      req.user = user;

      next();
    });
  }
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

let users = [
  {
    id: 1,
    nama: 'Admin',
    username: '10001',
    password: '$2b$10$IihcnzQNQ.z8f3JfaxfG.uWaYj4Keeiqqi2IEIGMmUr/XYVmu9VLy',
    role: 1,
  },
  {
    id: 2,
    nama: 'General Support',
    username: '20001',
    password: '$2b$10$ftm4sUgAyd8j0Ow5EJEf7uWrHNFb42N127an6pTBM6uIbTFePe3Su',
    role: 2,
  },
  {
    id: 3,
    nama: 'Accounting',
    username: '30001',
    password: '$2b$10$pAUMa1qZxqSRWzi2X1YFuOM83Voasp8CqHkwUsckAciABkC/DIlYe',
    role: 3,
  },
  {
    id: 4,
    nama: 'Agung Firmansyah',
    username: '40001',
    password: '$2b$10$w395tRgz2OcV4Is8hQ9BiutyfzO/1Cztep08GJ5qv/CcYa61eGl6u',
    role: 4,
  },
];

let payments = [
  {
    id_payment: 1,
    id_unit: 1,
    diminta_oleh: 'Asep Sunandar',
    keperluan: 'SPP Juli 2020',
    tanggal_pembayaran_aktual: '10/07/2021',
    jumlah_payment: 1000000,
    terbilang: 'Satu juta rupiah',
    nama_rek_penerima: 'MD. Mubarokhul Huda',
    no_rek_penerima: '15009757050',
    request_terkirim: '2021-07-25 08:59:59',
    alasan: '',
    status: 1,
  },
  {
    id_payment: 2,
    id_unit: 1,
    diminta_oleh: 'Agung Fir',
    keperluan: 'SPP Juli 2020',
    tanggal_pembayaran_aktual: '10/07/2021',
    jumlah_payment: 1000000,
    terbilang: 'Satu juta rupiah',
    nama_rek_penerima: 'MD. Mubarokhul Huda',
    no_rek_penerima: '15009757050',
    request_terkirim: '2021-07-25 08:59:59',
    alasan: '',
    status: 1,
  },
];

const response = {
  status: 200,
  message: 'berhasil',
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'success',
  });
});
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  let isValidate = false;

  isValidate = username === '' && password === '' ? false : true;

  if (isValidate) {
    const found = users.find((user) => user.username == username);

    if (found !== undefined) {
      users.forEach((user) => {
        if (user.username === username) {
          if (comparePassword(password, user.password)) {
            response.status = 200;
            response.message = 'Success login';
            response.data = {
              role: user.role,
            };
            response.token = generateAccessToken({
              username: username,
              role: user.role,
            });
            res.send(response);
            delete response.token;
            delete response.data;
          } else {
            response.status = 400;
            response.message = 'Wrong password';
            res.send(response);
          }
        }
      });
    } else {
      response.status = 400;
      response.message = 'Username tidak terdaftar!';
      res.send(response);
    }
  } else {
    response.status = 400;
    response.message = 'Please fill your username or password!';
    res.send(response);
  }
});

app.post('/payment/create', authenticateToken, (req, res) => {
  const diminta_oleh = req.body.diminta_oleh;
  const keperluan = req.body.keperluan;
  const jumlah_payment = req.body.jumlah_payment;
  const terbilang = req.body.terbilang;
  const nama_rek_penerima = req.body.nama_rek_penerima;
  const no_rek_penerima = req.body.no_rek_penerima;
  const request_terkirim = req.body.no_rek_penerima;
  const tanggal_pembayaran_aktual = req.body.tanggal_pembayaran_aktual;
  let isValidate = false;

  isValidate = diminta_oleh !== '' ? true : false;
  isValidate = keperluan !== '' ? true : false;
  isValidate = jumlah_payment !== '' ? true : false;
  isValidate = terbilang !== '' ? true : false;
  isValidate = nama_rek_penerima !== '' ? true : false;
  isValidate = no_rek_penerima !== '' ? true : false;
  isValidate = request_terkirim !== '' ? true : false;
  if (isValidate) {
    const payment = {
      id_payment: null,
      id_unit: 1,
      diminta_oleh,
      keperluan,
      tanggal_pembayaran_aktual,
      jumlah_payment,
      terbilang,
      nama_rek_penerima,
      no_rek_penerima,
      request_terkirim,
      request_terkirim,
      status: 1,
    };

    let idPaymentSebelumnya = 0;

    payments.forEach((payment) => {
      if (idPaymentSebelumnya <= payment.id_payment) {
        idPaymentSebelumnya = payment.id_payment;
      }
    });
    payment.id_payment = idPaymentSebelumnya + 1;

    payments.push(payment);
    response.data = payment;
    response.status = 200;
    response.message = 'Success create new payment';
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'Failed to create new payment, please check your form!';
    res.send(response);
  }

  delete response.data;
});

app.get('/list_payment', authenticateToken, (req, res) => {
  if (req.query.id_unit === '1') {
    response.status = 200;
    response.message = 'Success load list payment';
    response.data = payments;
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'Failed to load list payment';
    res.send(response);
  }

  delete response.data;
});

app.get('/payment/:id_payment', authenticateToken, (req, res) => {
  const idPayment = req.params.id_payment;
  const found = payments.findIndex(
    (payment) => payment.id_payment == idPayment
  );

  if (found !== -1) {
    response.status = 200;
    response.message = 'Success to load detail payment';
    response.data = payments[found];
    res.send(response);
    delete response.data;
  } else {
    response.status = 400;
    response.message = 'Payment not found';
    res.send(response);
  }
});

app.post('/akun/create', authenticateToken, (req, res) => {
  let id = 0;
  const nama = req.body.nama;
  const role = req.body.role;
  const username = req.body.username;
  let password = req.body.password;
  let isValidate = false;
  password = hashPassword(password);

  let newUser = {
    id,
    nama,
    username,
    password,
    role,
  };
  isValidate =
    nama !== '' && role !== '' && username !== '' && password !== ''
      ? true
      : false;

  if (isValidate) {
    const foundUsername = users.find(
      (user) => user.username === username && user !== null
    );

    if (foundUsername === undefined) {
      users.forEach((user) => {
        if (id <= user.id) {
          id = user.id;
        }
      });
      newUser.id = users.length + 1;

      users.push(newUser);
      response.status = 200;
      response.message = 'Success register';
      response.data = newUser;
      res.send(response);
      delete response.data;
    } else {
      response.status = 400;
      response.message = 'User sudah terdaftar!';
      res.send(response);
    }
  } else {
    response.status = 400;
    response.message = 'Please fill input your form!';
    res.send(response);
  }
});

app.get('/list_akun', authenticateToken, (req, res) => {
  response.status = 200;
  response.message = 'Success load list akun';
  response.data = users;
  res.send(response);
  delete response.data;
});

app.post('/payment/status/direject_gs', authenticateToken, (req, res) => {
  const reason = req.body.reason;
  const id_payment = req.body.id_payment;

  let idPayment = payments.findIndex((e) => e.id_payment == id_payment);
  if (idPayment !== -1) {
    payments[idPayment].alasan = reason;
    payments[idPayment].status = 2;

    response.status = 200;
    response.message = 'Success updated';
    response.data = payments[idPayment];
    res.send(response);
    delete payments.data;
  } else {
    response.status = 400;
    response.message = 'Payment not found!';
    res.send(response);
    delete payments.data;
  }
});

app.post('/payment/status/diteruskan', authenticateToken, (req, res) => {
  const id_payment = req.body.id_payment;
  const foundIdPayment = payments.findIndex((e) => e.id_payment == id_payment);

  if (foundIdPayment !== -1) {
    payments[foundIdPayment].alasan = '';
    payments[foundIdPayment].status = 3;

    response.status = 200;
    response.message = 'Success updated';
    response.data = payments[foundIdPayment];
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'Payment not found';
    res.send(response);
  }
  delete response.data;
});

app.post('/payment/status/direject_ac', authenticateToken, (req, res) => {
  const id_payment = req.body.id_payment;
  const foundIdPayment = payments.findIndex((e) => e.id_payment == id_payment);

  if (foundIdPayment !== -1) {
    payments[foundIdPayment].alasan = '';
    payments[foundIdPayment].status = 4;

    response.status = 200;
    response.message = 'Success updated';
    response.data = payments[foundIdPayment];
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'Payment not found';
    res.send(response);
  }
  delete response.data;
});

app.post('/payment/status/disetujui', authenticateToken, (req, res) => {
  const id_payment = req.body.id_payment;
  const foundIdPayment = payments.findIndex((e) => e.id_payment == id_payment);

  if (foundIdPayment !== -1) {
    payments[foundIdPayment].alasan = '';
    payments[foundIdPayment].status = 5;

    response.status = 200;
    response.message = 'Success updated';
    response.data = payments[foundIdPayment];
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'Payment not found';
    res.send(response);
  }
  delete response.data;
});

app.get('/akun/:id_user', authenticateToken, (req, res) => {
  const id_user = req.params.id_user;

  const foundIndexUser = users.findIndex((e) => e.id == id_user);
  if (foundIndexUser !== -1) {
    response.status = 200;
    (response.message = 'success'), (response.data = users[foundIndexUser]);
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'User not found';
    res.send(response);
  }
  delete response.data;
});

app.put('/akun/:id_user', authenticateToken, (req, res) => {
  const role = req.body.role;
  const username = req.body.username;
  const nama = req.body.nama;
  const id_user = req.params.id_user;

  const foundIdUser = users.findIndex((e) => e.id == id_user);

  if (foundIdUser !== -1) {
    users[foundIdUser].nama = nama;
    users[foundIdUser].username = username;
    users[foundIdUser].role = role;

    response.data = users[foundIdUser];
    response.status = 200;
    response.message = 'Success updated!';
    res.send(response);
    delete response.data;
  } else {
    response.status = 400;
    response.message = 'User not found';
    res.send(response);
    delete response.data;
  }
});

app.delete('/akun/:id_user', authenticateToken, (req, res) => {
  const id_user = req.params.id_user;
  const foundIndexUser = users.findIndex((e) => e.id == id_user);

  if (foundIndexUser !== -1) {
    response.status = 200;
    response.message = 'User deleted';
    response.data = { id_user: users[foundIndexUser].id };
    users.splice(foundIndexUser, 1);
    res.send(response);
  } else {
    response.status = 400;
    response.message = 'Uset not found';
    res.send(response);
  }
  delete response.data;
});

app.listen(PORT);
