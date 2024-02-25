import { CoreType } from "./core.type";
import { ExcerciseType } from "./excercise.type";

export interface TrainingSessionType extends CoreType {
    session_date: Date;
    workout_name: string;
    position: number;
    excercises?: ExcerciseType[];
}
