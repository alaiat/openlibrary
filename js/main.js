import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatu= document.getElementById('bilatu')
let libKop=document.getElementById('libKop')

function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 
    libKop.textContent=datubasea.length

}
async function gehituLiburua(){
    
    let gehiLiburu=await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN${isbn.value}&format=json&jscmd=details`).then(response=>{return response.json()})
    //console.log(gehiLiburu)
    let detaileak= gehiLiburu[`ISBN${isbn.value}`].details
    //console.log(detaileak)


    //IKASTEKO APUNTEA: Horrela ezdu funtzionatzen isbn_13 edo 10 batzutan existitzen ez direlako. Beraz, isbn-a badaukagulez, 
    //json objetutik hartu beharrean zuzenean hartuko dugu erabiltzaileak sartzen digun baliotik
    //let isb=detaileak.isbn_13[0]
    //if(isbn.value!= isb){
      //  isb=detaileak.isbn_10[0]
    //}


    let a={"isbn": isbn.value, "egilea": detaileak.authors.map(egile=>egile.name).join(","),"data": detaileak.publish_date,"izenburua":detaileak.title+":"+detaileak.subtitle,"filename":detaileak.covers[0]+ "-M.jpg"}
    datubasea.push(a)
    
    indizea=datubasea.length-1
    eremuakBete()
    
}


function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })

    bilatu.onclick= function(){
       
       let i= datubasea.findIndex(i => i.isbn==isbn.value)
       if(i!=-1){
        indizea=i
        eremuakBete()
       }else{
        gehituLiburua()
       }
        
    }


}

window.onload = kargatu;

