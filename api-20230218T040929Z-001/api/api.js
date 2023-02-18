function Leer() {
  
  const api_url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
  buscar1(api_url);
  console.log(api_url);
}

const buscar1=async(api_url)=>{
  const g = document.getElementById("input").value;


  const data= await fetch(api_url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6d19e503c2mshba2f761ab81b290p188f7fjsn8758a6abf597',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    } });
  const respuesta= await data.json();
  const Search = await respuesta.filter(e => e.title.includes(g));

  console.log(Search);
  if(g == '')
  {
    document.getElementById("lista").innerHTML=`<div style="margin-top:10px;">
    <img width='100%' src=https://st4.depositphotos.com/5365202/37818/v/450/depositphotos_378186382-stock-illustration-page-found-error-404-hand.jpg alt="No hay juegos"></img></div>`;
  }
  else
  {
    
    if(Search!=null)
    {   
        document.getElementById("lista").innerHTML='';
        Search.map((p)=>{

                document.getElementById("lista").innerHTML+=`<div style="margin-top:10px;">
                    <img width='100%' src=${p.thumbnail } ></img></div>`;
        })

    }

  }


}   

 