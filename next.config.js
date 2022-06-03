//! Next.js를 사용 중 node_modules안에 있는'@stripe/firestore-stripe-payments'이 transpile 되지않아 브라우저에서 에러가 발생함. next-transpile-modules 설치해서 아래처럼 모듈 추가 해줌

const withTM = require('next-transpile-modules')([
  '@stripe/firestore-stripe-payments',
]) // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'rb.gy'],
  },
})
