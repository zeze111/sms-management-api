import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const should = chai.should();

chai.use(chaiHttp);
