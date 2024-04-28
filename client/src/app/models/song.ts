export class Song{
    constructor(
        public number: number,
        public name: string,
        public duration: string,
        public file: string,
        public album: string,
        public _id?: string//no lo tenia 
    ){}
}