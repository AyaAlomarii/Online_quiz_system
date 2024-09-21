import DataObject from './DataObject';

export interface Quiz extends DataObject {
  id: number
  title: string
  start: string
  end: string
  date: string
  teacher: string
  points: number
  students: number
  status: string
}

