import SampleDTO from "./Sample.dto";

export default class SampleRepository implements BaseRepository<SampleDTO> {
  // Entity manager should go here
  constructor() {}

  create(data: Partial<SampleDTO>): Promise<SampleDTO> {
    throw new Error("Method not implemented.");
  }
  createMany(data: Partial<SampleDTO>[]): Promise<SampleDTO[]> {
    throw new Error("Method not implemented.");
  }
  update(id: number, data: Partial<SampleDTO>): Promise<SampleDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getCount(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  findAll(
    limit: number,
    skip: number,
    rest?: Record<string, any>
  ): Promise<TResultService<SampleDTO>> {
    throw new Error("Method not implemented.");
  }

  findById(id: number): Promise<SampleDTO> {
    throw new Error("Method not implemented.");
  }
}
