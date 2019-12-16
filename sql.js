class Sql {
    constructor(type,data){
        this.type=type;
        this.data=data;
    }
    add(x,y){
        console.log(x);
        this.type=='add'?(()=>{

        })():console.log('type is error')
    }
    delete(){

    }
    search(){

    }
}
var q=new Sql(1,2);
q.add(8,9);
