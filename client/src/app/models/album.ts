export class Album{
    constructor(
        public title: string,
        public description: string,
        public year: number,
        public image: string,
        public artist: string,
        public _id?: string//no lo tenia
    ){}
}