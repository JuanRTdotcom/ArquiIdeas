var aver=function (name){
    return document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || null;
}

var cook=aver('_keyBlog')
if(!cook){   
    
    window.location="./blog.html"
}
let _datadeBlog = [];
const __filtraBlog = (nombre = "Inicio") => {
    if (nombre == "Inicio") {
        // __llenaPaginacionYTabla(_datadeBlog);
        window.location = '/blog.html'
    } else {
        // let _datosFiltro = _datadeBlog.filter((x) => x.etiqueta == nombre);
        // __llenaPaginacionYTabla(_datosFiltro);
        window.location = '/blog.html'
    }
};
const __llenarBlogDetalleAqui = _keyN => {
    
    let _blogElegido = _datadeBlog.filter(x=>x.id == _keyN)
    __llenarBlog(_blogElegido,0,1)
}
const __filtraXNombre = _nombreSeleccionado => {
    // let _miFiltro = _datadeBlog.filter(x=>x.etiqueta.toLowerCase().trim() == _nombreSeleccionado.toLowerCase().trim())
    // __llenaPaginacionYTabla(_miFiltro)
    window.location = '/blog.html'
}

const __filtraXAutor = _nombreAutor => {
    // let _miFiltro = _datadeBlog.filter(x=>x.autor.toLowerCase().trim() == _nombreAutor.toLowerCase().trim())
    // __llenaPaginacionYTabla(_miFiltro)
    window.location = '/blog.html'
}


// let __borrarBlogCookie = () => {
//     document.cookie="_keyBlog =; expires=Thu, 01 Jan 1970 00:00:00 UTC";
//   }
// __borrarBlogCookie()
//////////////////////
let _miEspacioBlogHtml = document.getElementById("_detalleBlog");

//////////////////////////////////////helper//////////////////////

let _eligeMesNombre = (_mesNum) => {
    switch (Number(_mesNum)) {
        case 1:
            return "Ene";
            break;
        case 2:
            return "Feb";
            break;
        case 3:
            return "Mar";
            break;
        case 4:
            return "Abr";
            break;
        case 5:
            return "May";
            break;
        case 6:
            return "Jun";
            break;
        case 7:
            return "Jul";
            break;
        case 8:
            return "Ago";
            break;
        case 9:
            return "Sep";
            break;
        case 10:
            return "Oct";
            break;
        case 11:
            return "Nov";
            break;
        case 12:
            return "Dic";
            break;
    }
};
const unique = (value, index, self) => {
    return self.indexOf(value) === index;
};
///////////////////////////////////////////////////

let __llenarBlog = (_data, _inicio, _final) => {
    $('html, body').animate({scrollTop:350},300);
    _miEspacioBlogHtml.innerHTML = "";
    for (let i = _inicio; i < _final; i++) {
        if (_data[i]) {
            let _mesFechaBlog = _data[i].fecha.substr(5, 2);
            let _mesFechaBlogNombre = _eligeMesNombre(_mesFechaBlog);
            let _diaFechaBlog = _data[i].fecha.substr(8, 2);
            let _divPadre = document.createElement("div");
            _divPadre.setAttribute("class", "single-post");
            _divPadre.innerHTML = `  
            
                <div class="feature-img">
                    <img class="img-fluid" src="${_data[i].foto[0]}" alt="" >
                </div>
                <div class="blog_details">
                   
                        <h2 class="blog-head" style="color: #2d2d2d;">${
                        _data[i].titulo
                        }</h2>
                        <ul class="blog-info-link mt-3 mb-4">
                            <li><a><i class="fa fa-user"></i> ${_data[i].autor}</a></li>
                            <li><a><i class="fa fa-comments"></i> ${_data[i].etiqueta}</a></li>
                        </ul>  
                    
         `;

         _miEspacioBlogHtml.appendChild(_divPadre);
          _data[i].parrafos.forEach((x)=>{
            let p = document.createElement('p')
            p.textContent = x
            _miEspacioBlogHtml.appendChild(p);
          })              

          let _miFinal = `</div>
          <div class="navigation-top">
                     <div class="d-sm-flex justify-content-between text-center">
                        <p class="like-info"><span class="align-middle"><i class="fa fa-heart"></i></span> Visitanos en nuestras redes.</p>
                        
                        <ul class="social-icons">
                           <li><a href="https://www.facebook.com/ArquiIdeasDrywall"><i class="fab fa-facebook-f"></i></a></li>
                           <!-- <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                           <li><a href="#"><i class="fab fa-dribbble"></i></a></li>
                           <li><a href="#"><i class="fab fa-behance"></i></a></li> -->
                        </ul>
                     </div>
                     
                  </div>`
          _miEspacioBlogHtml.innerHTML +=_miFinal
         
            
         //   _miEspacioBlogHtml.appendChild(_miFinal);
        }
    }
};

// {/* <a class="blog_item_date text-center">
//                         <h3>${_diaFechaBlog}</h3>
//                         <p>${_mesFechaBlogNombre}</p>
//                     </a> */}
// let __llenaPaginacionYTabla = (_data) => {
    
//     let _cantidaddePaginas = Math.ceil(_data.length / 4);

//     // $("#pagination").twbsPagination("destroy");
//     $("#pagination").twbsPagination({
//         totalPages: _cantidaddePaginas,
//         visiblePages: Math.ceil(_cantidaddePaginas / (_cantidaddePaginas / 2)),
//         onPageClick: function (event, page) {
//             __llenarBlog(_data, page * 4 - 4, page * 4);
//         },
//     });
// };

const __llenaCategoria = (_dataCategoria) => {
    let _misEtiquetas = _dataCategoria.map(function (_dataCategoria) {
        return _dataCategoria.etiqueta;
    });
    let _misEtiquetasUnicas = _misEtiquetas.filter(unique);
    let _aquiMisCategorias = document.getElementById("_agregarCategorias");

    let _misCategoriasHtml = document.createElement("li");
    _misCategoriasHtml.innerHTML = `
                    
                        <a onclick="__filtraBlog('Inicio')" style="cursor:pointer;color:#2d2d2d !important" class="d-flex">
                            <p>Inicio</p>
                            <p> ( ${_dataCategoria.length} )</p>
                        </a>
                    
                `;
    _aquiMisCategorias.appendChild(_misCategoriasHtml);
    _misEtiquetasUnicas.forEach((x) => {
        let _cantidadElemento = _dataCategoria.filter(
            (miInfo) => miInfo.etiqueta == x
        );
        let _misCategoriasHtml = document.createElement("li");
        _misCategoriasHtml.innerHTML = `
                        
                            <a onclick="__filtraBlog('${x}')" style="cursor:pointer" class="d-flex">
                                <p>${x}</p>
                                <p> ( ${_cantidadElemento.length} )</p>
                            </a>
                        
                    `;
        _aquiMisCategorias.appendChild(_misCategoriasHtml);
    });
};

const __llenarPostRecientes = (_dataBlogRecientes) => {
    let _aquiMisNuevosPost = document.getElementById("_nuevosPost");
    for (let i = 0; i < 4; i++) {
        if (_dataBlogRecientes[i]) {
            let _elMes = _eligeMesNombre(_dataBlogRecientes[i].fecha.substr(5, 2));
            let _contieneNuevoPost = document.createElement("div");
            _contieneNuevoPost.setAttribute("class", "media post_item");
            _contieneNuevoPost.innerHTML = `
                <img src="${
                _dataBlogRecientes[i].foto[0]
                }" alt="nuevo" style="width:30px;height:30px;border-radius:50%">
                <div class="media-body">
                    <a style="cursor:pointer" onclick="__llenarBlogDetalleAqui('${_dataBlogRecientes[i].id}')">
                        <h3 style="color: #2d2d2d;">${_dataBlogRecientes[
                    i
                ].titulo.substr(0, 24)}...</h3>
                    </a>
                    <p>${_elMes} ${_dataBlogRecientes[i].fecha.substr(
                    8,
                    2
                )}, ${_dataBlogRecientes[i].fecha.substr(0, 4)}</p>
                </div>
                `;
            _aquiMisNuevosPost.appendChild(_contieneNuevoPost);
        } else {
            break;
        }
    }
};




// db.collection("cities").doc("SF");

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });

db.collection("blog")
    .get()
    .then(function (querySnapshot) {
    //    debugger
        querySnapshot.forEach((x) => {
            let t = x.data()
            t.id=x.id
            _datadeBlog.push(t);
        });
        let _data = _datadeBlog.map((x)=>{return x.titulo})
        new autoComplete({
        
            selector: '#buscarAqui',
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = _data;
                var suggestions = [];
                for (i=0;i<choices.length;i++)
                
                    if (~choices[i].toLowerCase().indexOf(term)) suggestions.push(choices[i]);
                suggest(suggestions);
            }
        });
        _datadeBlog.sort(function (a, b) {
            return b.fecha.localeCompare(a.fecha);
        });
        __llenaCategoria(_datadeBlog);
        __llenarPostRecientes(_datadeBlog);
       // __activaBuscadorAutocomplete(_datadeBlog);
    })
    .then(() => {
    //    __llenaPaginacionYTabla(_datadeBlog);
    // db.collection("cities").doc("SF");
    let _blogElegido = _datadeBlog.filter(x=>x.id == cook)
    __llenarBlog(_blogElegido,0,1)
    });

   
    
//   document.getElementById('_formulariodeBusqueda').addEventListener('submit',(e)=>{
//       e.preventDefault()
//       let _miValorBusqueda = document.getElementById('buscarAqui').value
//       let _miDataFiltrada = _datadeBlog.filter(x=>x.titulo.toLowerCase().trim() == _miValorBusqueda.toLowerCase().trim() )
//       __llenaPaginacionYTabla(_miDataFiltrada)

//   })

//   let __abrirBlogDetalle = _key => {
//         document.cookie = "_keyBlog =" + _key;
//         window.location = '/blog_details.html'
//   }












