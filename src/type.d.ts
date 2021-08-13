export interface Itodo {
    id: number
    item: string
    completed: boolean
    task_date: string
  }
  
export type todoState = {
todos: todo[]
}

export type todoAction = {
type: string
todo: Itodo
}
  
export type DispatchType = (args: todoAction) => todoAction