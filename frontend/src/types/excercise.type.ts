import { CoreType } from "./core.type";

export interface ExcerciseType extends CoreType {
    session_id: number;
    excercise_name: string;
    set_info: string;
    set_number: number;
}
