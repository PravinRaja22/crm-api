const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

const samlConfig = {
  entryPoint: 'https://vijayclouddevorg-dev-ed.my.salesforce.com/idp/login?app=0sp5j000000wkEG',
  issuer: 'https://cd-dev.smartapis.cyou/auth',
  callbackUrl: 'https://cd-dev.smartapis.cyou/auth/callback',
  cert: '-----BEGIN CERTIFICATE-----MIIEZDCCA0ygAwIBAgIOAYU0pthwAAAAAHo3H5YwDQYJKoZIhvcNAQELBQAwejESMBAGA1UEAwwJY2xvdWRkZXNrMRgwFgYDVQQLDA8wMEQ1ajAwMDAwQjdEOFcxFzAVBgNVBAoMDlNhbGVzZm9yY2UuY29tMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQswCQYDVQQIDAJDQTEMMAoGA1UEBhMDVVNBMB4XDTIyMTIyMTEyMjcwN1oXDTIzMTIyMTEyMDAwMFowejESMBAGA1UEAwwJY2xvdWRkZXNrMRgwFgYDVQQLDA8wMEQ1ajAwMDAwQjdEOFcxFzAVBgNVBAoMDlNhbGVzZm9yY2UuY29tMRYwFAYDVQQHDA1TYW4gRnJhbmNpc2NvMQswCQYDVQQIDAJDQTEMMAoGA1UEBhMDVVNBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApZz0pXRfWa/XtJdMXo5vhbi4MWp9Onus2xVuAAlDg9PZqeF9lumw3MR12d1fPw2Ev7kniFakYFPrWDYDdle8FlAToOha/iVqbjdH2DrtzZxKdFKuWYzrj5AMJfJo2HHOK3awPuW3NpdCBdOKFCf6GEkgeYHwds297/v12FgayUf1yqKxXujHdVbPvPRemqkvhPPwMiJbYfrs3psgbbbyvmVkw5vITW5JXo2b6Hzj1kDuUPyDXBMolVafQoQ57lVHZoa+ATUluZbssuzMfyPT4szxapjgHpuAA/egm2EQhzpJ2tzR7sk7hL4oLgCkJbGLYDFJvl2ZXl1Szhta4QbYWwIDAQABo4HnMIHkMB0GA1UdDgQWBBQilqVMIIRESwvYBTEUZe+sSWnfRTAPBgNVHRMBAf8EBTADAQH/MIGxBgNVHSMEgakwgaaAFCKWpUwghERLC9gFMRRl76xJad9FoX6kfDB6MRIwEAYDVQQDDAljbG91ZGRlc2sxGDAWBgNVBAsMDzAwRDVqMDAwMDBCN0Q4VzEXMBUGA1UECgwOU2FsZXNmb3JjZS5jb20xFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xCzAJBgNVBAgMAkNBMQwwCgYDVQQGEwNVU0GCDgGFNKbYcAAAAAB6Nx+WMA0GCSqGSIb3DQEBCwUAA4IBAQBQm/SiG5kBoIH43Gh8np8sgv7N1Yohqw9CGfWgdUKh574G4yU1n34cz9ksPDDXevcuaaQGraPaerOJ8uo3hmrd7R6+drnVsET39C867yjkxBmTfAD1n1tbfsWfBbGjMZHUe5GyBbIXfFZv/FGimWaz34XVR7IQa/st2VOtaB+JRbqlwr+yYPL8J4zDwZbG/kpHY/EmvWvpPIqXRfibUHqpP+xg1vsb9a+hpvYBDMZ0Ih1FHjUmvnJEzw2jmZWCyfoubcCRi0nK1MvVO30o/FN+IMpQEk32jtwxEMDw2elg3i48zK5IOZ0+r3mlxST/kvkKzKEwauYYs4jVrN6u8Zrj-----END CERTIFICATE-----'
}
console.log(SamlStrategy, 'strategy')
passport.use(
  new SamlStrategy(samlConfig, (profile, done) => {
    console.log('profile is', profile);
    return done(null, profile);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
