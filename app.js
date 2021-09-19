const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
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
          id_unit: 1,
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
app.listen(3001);
