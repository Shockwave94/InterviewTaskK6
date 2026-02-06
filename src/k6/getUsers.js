import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.1.0/index.js'


export const options = {
  vus: 100,
  duration: '10s',
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)']
};

const stepA = new Trend('A_Get_Users_Endpoint')

export default function getUsersPerformanceTest() {
  const params = {
    headers: {
      'x-api-key': 'reqres_4900e8ef95e743b894a0fee1d09cba90',
    },
  };
  let res = http.get('https://reqres.in/api/users?page=1', params);
  stepA.add(res.timings.duration)
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}

export function handleSummary(data) {
  const timestamp = Date.now();

  return {
    [`reports/Get_Users_Performance_Tests_${timestamp}.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true })
  };
}
