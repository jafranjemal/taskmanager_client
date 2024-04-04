 
import { ITaskModel } from "src/app/models/tasks.interface"
 

export interface ITaskState  {
    tasks: ITaskModel[],
    loading: boolean;
    error: any;
}

export const initialState: ITaskState =  {
    tasks: [],
    loading: false, 
    error: null,
    
} 