import http from 'k6/http';
import { sleep, check } from 'k6';

// Анхны, stages-гүй хувилбар.
// Ганц VU/duration-г командын мөрөөс дамжуулна:
//   k6 run --vus 5   --duration 1m script.js
//   k6 run --vus 30  --duration 1m script.js
//   k6 run --vus 100 --duration 1m script.js
export const options = {
  vus: 5,
  duration: '30s',
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
