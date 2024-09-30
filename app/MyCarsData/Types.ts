export interface VehicleModel {
  modelName: string;
  description?: string;
  launchPrice?: number;
  vehicleType?: string;
  seatingCapacity?: number;
  engineType?: string;
  colorsAvailable?: string[];
  horsepower?: number;
  torque?: number;
  year?:number;
  variants?: string[];
  images?: string[];
}
