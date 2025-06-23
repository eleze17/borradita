export const Resultados =({resultado})=>{
let nombreDia  

return(
<div className="resultados">
    <style>{` .resultados { 
               display: grid;
               grid-template-columns: repeat(11, auto) ;
               grid-template-rows: repeat( 2, auto) ;
               width:90%;
               align-items:center;
               background-color:rgb(7, 53, 44) ;
                            
    
    } `}</style>

{resultado.map((valor,index)=>{
    switch (index){
    case 0:nombreDia='Lunes'
     break;
    case 20:nombreDia='Martes'
    break;
    case 40:nombreDia='Miercoles'
    break;
    case 60:nombreDia='Jueves'
    break;
    case 80:nombreDia='Viernes'
 break;
 default : nombreDia=null 
}


return(
    <>
    {nombreDia ? (<div className="dia">{nombreDia}</div>):''}
    
     <div className="item-resultados">
        {valor}


    </div>
    </>
    )

})}

</div>)
}
