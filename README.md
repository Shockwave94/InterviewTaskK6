# InterviewTaskk6

## 🧪 Description

This repository contains k6 performance tests for the GET /api/users?page=1 endpoint.
---

## Quick start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shockwave94/InterviewTaskk6.git
   cd InterviewTaskk6
2. **Install dependencies**
   ```bash
   npm ci

3. **Install k6**
https://grafana.com/docs/k6/latest/set-up/install-k6/

4. **Run tests locally**
   ```bash
   Basic: k6 run src/k6/getUsers.js
   Optional: Additional summary results k6 run  --summary-export=summary.json src/k6/getUsers.js

   The test will generate an HTML report and print a summary to stdout after completion and generate summary.json if used optional command 

## Summary

1. **Test setup and assumptions**
The test targets a single GET /api/users?page=1 endpoint.
The endpoint returns a small, static JSON payload (list of users).
Test was executed with 100 virtual users over 10 seconds using k6.
Traffic pattern was steady with 1s delay

2. **Interpretation of results**
To see all of the details please review the html file inside of the reports folder, but below are the most important metrics.

The endpoint works well during the test.
There were no errors and all requests were successful.
The response time is fast.
Most requests finished in less than 50 milliseconds, which is good for a public API.
Sometimes a request is slower than usual, but this happens rarely and does not affect the test results.
Overall endpoint can handle 100 users at the same time without problems and with stable performance.

```bash
Total requests: 1000
Throughput: ~96 req/s
Error rate: 0%
Average response time: ~15.7 ms
p95 response time: ~25 ms
p99 response time: ~72 ms
Max response time: ~126 ms
```

I choose the 10 seconds duration because for the endpoint like that's enough to get the sample data for percentiles, it will also not overload the api and we get fast feedback.
Anyway, I think the most important questions, even before testing, are what exactly we want to test with this endpoint and what the use case is, what is the expected traffic on this endpoint.
We could perform various types of tests to verify how the system behaves. Basic load test like this one, stress test with even more VUS 500+ and duration of 5-10 minutes without the 1 second sleep, spike testing to verify how the app behaves under sudden, big and short increases in traffic, or breakpoint testing that would gradually increase the VUS to identify the maximum capacity or breaking point of the system.

3. **Potential improvements**
I think the system already perfom well for such public api endpoint, but base on the response logic I could suggest for example caching the response as we alwasy get the same object back (ofc assuming that this list of users is static)



