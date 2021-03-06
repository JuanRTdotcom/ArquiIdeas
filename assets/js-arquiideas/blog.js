let __borrarBlogCookie = () => {
    document.cookie="_keyBlog =; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  }

//////////////////////
let _miEspacioBlogHtml = document.getElementById("_blogsBaseDatos");

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
let _datadeBlog = [];

let __llenarBlog = (_data, _inicio, _final) => {
    $('html, body').animate({scrollTop:350},300);
    _miEspacioBlogHtml.innerHTML = "";
    
    for (let i = _inicio; i < _final; i++) {
        if (_data[i]) {
            let _mesFechaBlog = _data[i].fecha.substr(5, 2);
            let _mesFechaBlogNombre = _eligeMesNombre(_mesFechaBlog);
            let _diaFechaBlog = _data[i].fecha.substr(8, 2);
            let _divPadre = document.createElement("article");
            _divPadre.setAttribute("class", "blog_item");
            _divPadre.innerHTML = `  
            
                <div class="blog_item_img">
                    <img class="card-img rounded-0" src="${
                _data[i].foto[0]
                }" alt="" >
                    <a class="blog_item_date text-center">
                        <h3>${_diaFechaBlog}</h3>
                        <p>${_mesFechaBlogNombre}</p>
                    </a>
                </div>
                <div class="blog_details">
                    <a class="d-inline-block" data-toggle="modal" >
                        <h2 class="blog-head" onclick="__abrirBlogDetalle('${_data[i].id}')" style="color: #2d2d2d;cursor:pointer;">${
                _data[i].titulo
                }</h2>
                    </a>
                    <p style="color:#2D2D2D">${_data[i].parrafos[0].substr(0, 130) + "..."}</p>
                    <ul class="blog-info-link">
                        <li><a onclick="__filtraXAutor('${_data[i].autor}') " style="cursor:pointer;color:#00000070;"><i class="fa fa-user"></i> ${
                _data[i].autor
                }</a></li>
                        <li><a onclick="__filtraXNombre('${_data[i].etiqueta}') " style="cursor:pointer;color:#00000070;"><i class="fa fa-comments"></i> ${
                _data[i].etiqueta
                }</a></li>
                    </ul>
                </div>
         `;
            _miEspacioBlogHtml.appendChild(_divPadre);
        }
    }
};

let __llenaPaginacionYTabla = (_data) => {
    
    let _cantidaddePaginas = Math.ceil(_data.length / 4);

     $("#pagination").twbsPagination("destroy");
    $("#pagination").twbsPagination({
        totalPages: _cantidaddePaginas,
        visiblePages: Math.ceil(_cantidaddePaginas / (_cantidaddePaginas / 2)),
        onPageClick: function (event, page) {

            
           
        __llenarBlog(_data, page * 4 - 4, page * 4);
        
          
    

            
        },
    });
};

const __llenaCategoria = (_dataCategoria) => {
    let _misEtiquetas = _dataCategoria.map(function (_dataCategoria) {
        return _dataCategoria.etiqueta;
    });
    let _misEtiquetasUnicas = _misEtiquetas.filter(unique);
    let _aquiMisCategorias = document.getElementById("_agregarCategorias");

    let _misCategoriasHtml = document.createElement("li");
    _misCategoriasHtml.innerHTML = `
                    
                        <a onclick="__filtraBlog('Todos')" style="cursor:pointer;color:#2d2d2d !important" class="d-flex">
                        <p style="font-weight: 900;">Todos</p>
                            <p style="font-weight: 900;"> ( ${_dataCategoria.length} )</p>
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
                    <a style="cursor:pointer" onclick="__abrirBlogDetalle('${_dataBlogRecientes[i].id}')">
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

const __filtraBlog = (nombre = "Todos") => {
    let _espacioTransicion = document.getElementById('_aquiTransicion')
      _espacioTransicion.style.transform = 'translateX(-200%)'
      setTimeout(()=>{
        if (nombre == "Todos") {
        
            __llenaPaginacionYTabla(_datadeBlog);
        } else {
            let _datosFiltro = _datadeBlog.filter((x) => x.etiqueta == nombre);
            __llenaPaginacionYTabla(_datosFiltro);
        }
         
          _espacioTransicion.style.opacity = 0
    _espacioTransicion.style.opacity = 1
    _espacioTransicion.style.transform = 'translateX(0)'
    },300)
     
};

const __filtraXNombre = _nombreSeleccionado => {
    let _espacioTransicion = document.getElementById('_aquiTransicion')
    _espacioTransicion.style.transform = 'translateX(-200%)'
    
   

    setTimeout(()=>{
        let _miFiltro = _datadeBlog.filter(x=>x.etiqueta.toLowerCase().trim() == _nombreSeleccionado.toLowerCase().trim())
    __llenaPaginacionYTabla(_miFiltro)

          _espacioTransicion.style.opacity = 0
    _espacioTransicion.style.opacity = 1
    _espacioTransicion.style.transform = 'translateX(0)'
    },300)
     
}


const __filtraXAutor = _nombreAutor => {
    let _espacioTransicion = document.getElementById('_aquiTransicion')
    _espacioTransicion.style.transform = 'translateX(-200%)'
    
    setTimeout(()=>{
        let _miFiltro = _datadeBlog.filter(x=>x.autor.toLowerCase().trim() == _nombreAutor.toLowerCase().trim())
        __llenaPaginacionYTabla(_miFiltro)
         
          _espacioTransicion.style.opacity = 0
    _espacioTransicion.style.opacity = 1
    _espacioTransicion.style.transform = 'translateX(0)'
    },300)
     
}
   


db.collection("blog")
    .get()
    .then(function (querySnapshot) {
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
        __llenaPaginacionYTabla(_datadeBlog);
    });


    
  document.getElementById('_formulariodeBusqueda').addEventListener('submit',(e)=>{
      e.preventDefault()
      
      

      ///////////transision de busqueda ///////
      let _espacioTransicion = document.getElementById('_aquiTransicion')
      _espacioTransicion.style.transform = 'translateX(-200%)'
    
    //////////////////////////////////////////
 setTimeout(()=>{
    let _miValorBusqueda = document.getElementById('buscarAqui')
    let _miDataFiltrada = _datadeBlog.filter(x=>x.titulo.toLowerCase().trim() == _miValorBusqueda.value.toLowerCase().trim() )
    _miValorBusqueda.value = ''
    if(_miDataFiltrada.length<=0){
        
    }else{
        __llenaPaginacionYTabla(_miDataFiltrada)
    }
      
     
      _espacioTransicion.style.opacity = 0
_espacioTransicion.style.opacity = 1
_espacioTransicion.style.transform = 'translateX(0)'
},300)

      

      
  })

  let __abrirBlogDetalle = _key => {
      
    __borrarBlogCookie()
        document.cookie = "_keyBlog =" + _key;
        
        window.location = './blog_details.html'

  }

  