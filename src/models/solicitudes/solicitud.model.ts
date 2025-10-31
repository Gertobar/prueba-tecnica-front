import { Empleado } from "../empleados/empleado.model";

export class Solicitud {
  id?: number | null;
  estado?: string;
  fechaSolicitud?: string;
  fechaInicio?: string;
  fechaFin?: string;
  fechaAprobacion?: string;
  diasVacaciones?: number;
}
