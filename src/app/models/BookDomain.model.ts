import { BookModule } from './bookModule.model'
export class BookDomain{
 constructor(public name: string , public bookModules:BookModule[]){

    }
}