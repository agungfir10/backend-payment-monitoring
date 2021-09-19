const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

const PORT = process.env.PORT || 3000;
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
  if (req.body.username === 'bambang@bri.co.id') {
    if (req.body.password === 'bambang123') {
      let success = {
        status: 200,
        message: 'success',
        data: {
          id_cust: 1,
        },
      };
      res.send(success);
    }
  } else {
    res.send({ status: 200, message: 'failed' });
  }
});

app.post('/payment/create', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_payment: 2,
      id_unit: 1,
      diminta_oleh: 'Asep Sunandar',
      keperluan: 'SPP Juli 2020',
      tanggal_pembayaran_aktual: '10/07/2021',
      jumlah_payment: 1000000,
      terbilang: 'Satu juta rupiah',
      nama_rek_penerima: 'MD. Mubarokhul Huda',
      no_rek_penerima: '15009757050',
      request_terkirim: '2021-07-25 08:59:59',
      status: 1,
    },
  });
});

app.get('/list_payment', (req, res) => {
  console.log(req.query.id_unit === '1');
  if (req.query.id_unit === '1') {
    res.send({
      status: 200,
      message: 'success',
      data: [
        {
          id_unit: 1,
          id_payment: 2,
          diminta_oleh: 'Asep Sunandar',
          keperluan: 'SPP Juli 2020',
          tanggal_pembayaran_aktual: '10/07/2021',
          jumlah_payment: 1000000,
          terbilang: 'Satu juta rupiah',
          nama_rek_penerima: 'MD. Mubarokhul Huda',
          no_rek_penerima: '15009757050',
          request_terkirim: '2021-07-25 08:59:59',
          status: 1,
        },
        {
          id_unit: 2,
          id_payment: 2,
          diminta_oleh: 'Agung Fir',
          keperluan: 'SPP Juli 2020',
          tanggal_pembayaran_aktual: '10/07/2021',
          jumlah_payment: 1000000,
          terbilang: 'Satu juta rupiah',
          nama_rek_penerima: 'MD. Mubarokhul Huda',
          no_rek_penerima: '15009757050',
          request_terkirim: '2021-07-25 08:59:59',
          status: 1,
        },
      ],
    });
  } else {
    res.send({
      status: 200,
      message: 'failed',
    });
  }
});

app.get('/payment/2', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_unit: 1,
      id_payment: 2,
      diminta_oleh: 'Asep Sunandar',
      keperluan: 'SPP Juli 2020',
      tanggal_pembayaran_aktual: '10/07/2021',
      jumlah_payment: 1000000,
      terbilang: 'Satu juta rupiah',
      nama_rek_penerima: 'MD. Mubarokhul Huda',
      no_rek_penerima: '15009757050',
      request_terkirim: '2021-07-25 08:59:59',
      status: 1,
    },
  });
});

app.post('/akun/create', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_user: 4,
      nama: 'Dinda Eka',
      role: 2,
      username: '10001',
      password: 'cek10001',
    },
  });
});

app.get('/list_akun', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: [
      {
        id_user: 4,
        nama: 'Dinda Eka',
        role: 2,
        username: '10001',
      },
      {
        id_user: 4,
        nama: 'Dinda Eka',
        role: 2,
        username: '10001',
      },
    ],
  });
});

app.post('/payment/status/direject_gs', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_unit: 1,
      id_payment: 2,
      diminta_oleh: 'Asep Sunandar',
      keperluan: 'SPP Juli 2020',
      tanggal_pembayaran_aktual: '10/07/2021',
      jumlah_payment: 1000000,
      terbilang: 'Satu juta rupiah',
      nama_rek_penerima: 'MD. Mubarokhul Huda',
      no_rek_penerima: '15009757050',
      request_terkirim: '2021-07-25 08:59:59',
      status: 2,
      rejected_reason: 'Nomor Rekening tidak ditemukan',
    },
  });
});

app.post('/payment/status/disetujui', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_unit: 1,
      id_payment: 2,
      diminta_oleh: 'Asep Sunandar',
      keperluan: 'SPP Juli 2020',
      tanggal_pembayaran_aktual: '10/07/2021',
      jumlah_payment: 1000000,
      terbilang: 'Satu juta rupiah',
      nama_rek_penerima: 'MD. Mubarokhul Huda',
      no_rek_penerima: '15009757050',
      request_terkirim: '2021-07-25 08:59:59',
      disetujui_pada: '2021-07-28 08:59:59',
      status: 5,
    },
  });
});

app.get('/akun/4', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_user: 4,
      nama: 'Dinda Eka',
      role: 2,
      username: '10001',
    },
  });
});

app.put('/akun/4', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_user: 4,
      nama: 'Dinda Eka',
      role: 2,
      username: '10001',
    },
  });
});

app.delete('/akun/4', (req, res) => {
  res.send({
    status: 200,
    message: 'berhasil',
    data: {
      id_user: 4,
    },
  });
});

app.post('/payment/status/direject_ac', (req, res) => {
  if (typeof req.body.id_payment !== 'number') {
    return res.send({
      status: 400,
      message: 'payment id harus integers',
    });
  }
  if (req.body.id_payment) {
    return res.send({
      status: 200,
      message: 'success',
      data: [
        {
          id_unit: 1,
          id_payment: 2,
          diminta_oleh: 'Asep Sunandar',
          keperluan: 'SPP Juli 2020',
          tanggal_pembayaran_aktual: '10/07/2021',
          jumlah_payment: 1000000,
          terbilang: 'Satu juta rupiah',
          nama_rek_penerima: 'MD. Mubarokhul Huda',
          no_rek_penerima: '15009757050',
          request_terkirim: '2021-07-25 08:59:59',
          status: 1,
        },
      ],
    });
  } else {
    return res.send({
      status: 400,
      message: 'payment id tidak di temukan',
    });
  }
});

app.post('/payment/status/diteruskan', (req, res) => {
  if (typeof req.body.id_payment !== 'number') {
    return res.send({
      status: 400,
      message: 'payment id harus integers',
    });
  }
  if (req.body.id_payment) {
    res.send({
      status: 200,
      message: 'success',
      data: [
        {
          id_unit: 1,
          id_payment: 2,
          diminta_oleh: 'Asep Sunandar',
          keperluan: 'SPP Juli 2020',
          tanggal_pembayaran_aktual: '10/07/2021',
          jumlah_payment: 1000000,
          terbilang: 'Satu juta rupiah',
          nama_rek_penerima: 'MD. Mubarokhul Huda',
          no_rek_penerima: '15009757050',
          request_terkirim: '2021-07-25 08:59:59',
          status: 1,
        },
      ],
    });
  } else {
    res.send({
      status: 400,
      message: 'payment id tidak di temukan',
    });
  }
});
app.listen(PORT);
