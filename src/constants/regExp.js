export const REGEXP_NUMBER = /^\d+$/;
export const REGEXP_EMAIL = /.+@.+\..+/i;
export const REGEXP_PHONE_NUMBER = /^[0-9+()-]*$/i;
export const REGEXP_NAME = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]/;
export const REGEXP_PASSWORD = /(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z]).[0-9a-zA-Z!@#$%^&*_-]{8,20}/i;