import http from 'k6/http';
import { sleep, check } from 'k6';

// АНХААР: p(95)<300 бол ЗӨВХӨН синтаксийн жишээ!
// Өөрийн Алхам 2-т хэмжсэн baseline p95-аа энд орлуулна
// (жишээ нь: baseline p95 × 1.5), тэгээд яагаад тэр утгыг
// сонгосноо README-д 1-2 өгүүлбэрээр тайлбарла.
export const options = {
  vus: 30,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<300'], // TODO: өөрийн baseline дээр үндэслэсэн утгаар солих
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
