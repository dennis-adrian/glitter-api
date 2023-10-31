import { Injectable } from '@nestjs/common';
import { ProgramsList } from './utils/programsList';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramsService {
  private _programs = new ProgramsList().programs;

  findAll(): Program[] {
    return this._programs;
  }
}
