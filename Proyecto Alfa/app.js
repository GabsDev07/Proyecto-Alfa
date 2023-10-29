function buscar() {
    let b = document.getElementById("buscador");
    let s = b.value;

    if (s.trim() != '') {
        let j = 0;

        const resHead = document.getElementById("resultados-head");
        resHead.style.display = "flex"; 
        resHead.innerHTML = "Resultados de "+ s.trim() + " ("+ j +") :";

        fetch("https://api.artic.edu/api/v1/artworks/search?q=" + s.trim())
        .then(data => data.json())
        .then(datos => {
            console.log(datos)
            const lista = document.getElementById("resultados");
            
            while((i = lista.getElementsByTagName("li")).length > 0) {
                lista.removeChild(i[0]);
            }

            for (i in datos.data) {
                fetch(datos.data[i].api_link+"?fields=id,title,image_id,artist_title")
                .then(data => data.json())
                .then(datos => {
                    console.log(datos)
                    //document.querySelector("body").innerHTML += `<img src="${datos.config.iiif_url+"/"+datos.data.image_id+"/full/150,/0/default.jpg"}" alt="Pintura">`
                    const item = document.createElement("li")
		            item.innerHTML = `<div class="box-result">
                        <img class="img-result" style="grid-area: img;" src="${datos.config.iiif_url+"/"+datos.data.image_id+"/full/150,/0/default.jpg"}" alt="Imagen"> 
                        <ul style="grid-area: data;list-style: none">
                            <li class="title-result">${datos.data.title}</li>
                            <li class="author-result">${datos.data.artist_title}</li>
                        </ul>
                        </div>
                        `;
                    //item.className="box-result";
		            lista.appendChild(item);

                    j++;
                    resHead.innerHTML = "Resultados de "+ s.trim() + " ("+ j +") :";
                    })
                }
            })
        b.value="";
        }
    }

