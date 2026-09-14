import http from 'k6/http';
import { sleep, check } from 'k6';

// Ачааллыг шатлан өсгөх хувилбар — зөвхөн ерөнхий зургийг ажиглахад зориулав.
// Хүснэгтийн тоог үүнээс БИШ, script.js-ийг 5/30/100 VU-аар тусад нь
// ажиллуулсан гурван run-аас ав.
export const options = {
  stages: [
    { duration: '30s', target: 5 },    // халаалт
    { duration: '1m', target: 30 },    // өсгөлт
    { duration: '30s', target: 100 },  // оргил
    { duration: '30s', target: 0 },    // буулт
  ],
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200 байна': (r) => r.status === 200 });
  sleep(1);
}
