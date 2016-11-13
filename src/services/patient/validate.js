import { BadRequestError } from 'meaning-error';


const SAFE_LENGTH = 5000;
const AGE_RANGE = [1, 99];
const ZIP_RANGE = [3, 5];


export default async function validate (data) {
  if (!data) {
    throw new BadRequestError('Please inform your details.');
  }

  validateGender(data);
  validateFirstname(data);
  validateLastname(data);
  validateEmail(data);
  validatePhone(data);
  validateAge(data);
  validateZip(data);
  validateTerms(data);
}

function validateGender ({ gender }) {
  if (!gender) {
    throw new BadRequestError('Please inform your gender.');
  }

  if (!['female', 'male'].includes(gender)) {
    throw new BadRequestError('Please choose female or male for your gender.');
  }
}

function validateFirstname ({ firstname }) {
  if (!firstname) {
    throw new BadRequestError('Please inform your firstname.');
  }

  if (firstname.length > SAFE_LENGTH) {
    throw new BadRequestError('Firstname is too big.');
  }
}

function validateLastname ({ lastname }) {
  if (!lastname) {
    throw new BadRequestError('Please inform your lastname.');
  }

  if (lastname.length > SAFE_LENGTH) {
    throw new BadRequestError('Lastname is too big.');
  }
}

function validateEmail ({ email }) {
  if (!email) {
    throw new BadRequestError('Please inform your email address.');
  }

  if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    throw new BadRequestError('Please inform a valid email address.');
  }
}

function validatePhone ({ phone }) {
  if (!phone) {
    throw new BadRequestError('Please inform your phone.');
  }

  if (phone.length > SAFE_LENGTH) {
    throw new BadRequestError('Phone is too big.');
  }

  if (!/^\d+$/.test(phone)) {
    throw new BadRequestError('Phone must not contain letters.');
  }
}

function validateAge ({ age }) {
  if (!age) {
    throw new BadRequestError('Please inform your age.');
  }

  const safeAge = parseInt(age, 10);
  if (isNaN(safeAge)) {
    throw new BadRequestError('Please inform a valid age.');
  }

  if (safeAge < AGE_RANGE[0] || safeAge > AGE_RANGE[1]) {
    throw new BadRequestError(`Age must be a value between ${AGE_RANGE[0]} and ${AGE_RANGE[1]}.`);
  }
}

function validateZip ({ zip }) {
  if (!zip) {
    throw new BadRequestError('Please inform your zip code.');
  }

  if (zip.length < ZIP_RANGE[0] || zip.length > ZIP_RANGE[1]) {
    throw new BadRequestError(`Zip must be a value between ${ZIP_RANGE[0]} and ${ZIP_RANGE[1]} digits.`); // eslint-disable-line max-len
  }

  if (!/^\d+$/.test(zip)) {
    throw new BadRequestError('Zip must not contain letters.');
  }
}

function validateTerms ({ termsAccepted }) {
  if (!termsAccepted) {
    throw new BadRequestError('Please accept the terms.');
  }

  if (termsAccepted.toString() !== 'true') {
    throw new BadRequestError('Please accept the terms.');
  }
}
