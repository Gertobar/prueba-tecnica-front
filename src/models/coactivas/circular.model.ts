export class Circular {
  id?: number | null;
  titulo?: string;
  anexo?: string;
  fechaSeps?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;

  constructor(data?: Partial<Circular>) {
    Object.assign(this, data);
  }
}
