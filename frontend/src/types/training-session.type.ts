import { CoreType } from "./core.type";

export interface TrainingSessionType extends CoreType {
    session_date: Date;
    workout_name: string;
}
