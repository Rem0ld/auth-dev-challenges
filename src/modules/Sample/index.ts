import SampleService from "./Sample.service";
import SampleController from "./Sample.controller";

const service = new SampleService();
const controller = new SampleController(service);

export default controller;
