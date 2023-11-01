import { Program } from '../entities/program.entity';

export class ProgramsList {
  private _counterId = 1;
  private _programs: Program[] = [
    {
      id: this._counterId++,
      name: 'Glitter Version 1',
    },
    {
      id: this._counterId++,
      name: 'Feria de Halloween',
    },
  ];

  public get programs(): Program[] {
    return this._programs;
  }
}
