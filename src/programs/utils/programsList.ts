import { Program } from '../entities/program.entity';

export class ProgramsList {
  private _counterId = 1;
  private _programs: Program[] = [
    {
      id: this._counterId++,
      name: 'Glitter Version 1',
      date: Date(),
    },
    {
      id: this._counterId++,
      name: 'Feria de Halloween',
      date: Date(),
    },
  ];

  public get programs(): Program[] {
    return this._programs;
  }
}
