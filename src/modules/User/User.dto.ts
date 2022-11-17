import baseDTO from "../../utils/baseDTO";

export default class SampleDTO extends baseDTO {
  // Example
  id: number;
  length: number;

  // Should have the type
  constructor(data: any) {
    super();
    for (const el in data) {
      if (data[el] !== null) {
        this[el] = data[el];
      }
    }
  }
}
