import { expect } from 'chai';
import * as service from '../../../src/services/patient';
import { createBigString } from '../../spec-helper';

describe('patient-service', () => {
  describe('validate', () => {
    it('should throw for invalid patient object', async () => {
      let hasError = false;
      try {
        await service.validate();
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your details.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty gender', async () => {
      const data = {
        gender: '',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your gender.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for invalid gender', async () => {
      const data = {
        gender: 'B',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please choose female or male for your gender.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty firstname', async () => {
      const data = {
        gender: 'male',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your firstname.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for big firstname', async () => {
      const data = {
        gender: 'male',
        firstname: createBigString(),
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Firstname is too big.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty lastname', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your lastname.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for big lastname', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: createBigString(),
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Lastname is too big.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty email', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: '',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your email address.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for invalid email format', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mail.com',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform a valid email address.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty phone', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your phone.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for big phone', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: createBigString(),
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Phone is too big.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw when phone contains letters', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '098123D1ab99',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Phone must not contain letters.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty age', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your age.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for invalid age', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 'abc',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform a valid age.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for age not in range', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: -50,
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Age must be a value between 1 and 99.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for empty zip', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 10,
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please inform your zip code.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw for invalid zip range', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 10,
        zip: '00',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Zip must be a value between 3 and 5 digits.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw when zip contains letters', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 10,
        zip: '30A34',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Zip must not contain letters.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw when acceptedTerms is empty', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 10,
        zip: '12345',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please accept the terms.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should throw when acceptedTerms is not a valid boolean/int value', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 10,
        zip: '12345',
        acceptedTerms: 'abc123',
      };

      let hasError = false;
      try {
        await service.validate(data);
      } catch (e) {
        hasError = true;
        expect(e.name).to.be.equal('BadRequestError');
        expect(e.message).to.be.equal('Please accept the terms.');
        expect(e.code).to.be.equal(400);
      }
      expect(hasError).to.be.equal(true);
    });

    it('should not throw when valid patient', async () => {
      const data = {
        gender: 'male',
        firstname: 'Mickey',
        lastname: 'Mouse',
        email: 'mickey@mouse.com',
        phone: '0123456789',
        age: 10,
        zip: '12345',
        termsAccepted: true,
      };

      await service.validate(data);
    });
  });
});
