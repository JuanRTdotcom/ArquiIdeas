
let _eligeMesNombre = _mesNum => {
    
    switch (Number(_mesNum)) {
        case 1:
            return 'Ene'
            break;
        case 2:
            return 'Feb'
            break;
        case 3:
            return 'Mar'
            break;
        case 4:
            return 'Abr'
            break;
        case 5:
            return 'May'
            break;
        case 6:
            return 'Jun'
            break;
        case 7:
            return 'Jul'
            break;
        case 8:
            return 'Ago'
            break;
        case 9:
            return 'Sep'
            break;
        case 10:
            return 'Oct'
            break;
        case 11:
            return 'Nov'
            break;
        case 12:
            return 'Dic'
            break;
    }
}
let _todoBlog = []
let _aquiBlogRecientes = document.getElementById('_blogRecientes')
db.collection("blog").get().then(function (querySnapshot) {
    let _miEspacioBlogHtml = document.getElementById('_blogRecientes')
    _miEspacioBlogHtml.innerHTML = ''
    querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        _todoBlog.push(doc.data())
    });
    _todoBlog.sort(function (a, b){
         return b.fecha.localeCompare(a.fecha)
    })
    for (let i = 0; i < 2; i++) {
        let _mesFechaBlog = _todoBlog[i].fecha.substr(5, 2)
        let _mesFechaBlogNombre = _eligeMesNombre(_mesFechaBlog)
        let _diaFechaBlog = _todoBlog[i].fecha.substr(8, 2)
        let _divPadre = document.createElement('div')
        _divPadre.setAttribute('class', 'col-xl-6 col-lg-6 col-md-6')
        _divPadre.innerHTML = ` 
            <div class="home-blog-single mb-30">
                <div class="blog-img-cap">
                    <div class="blog-img" style="max-height:330px">
                        <img src="${_todoBlog[i].foto[0]}" alt="">
                        <div class="blog-date text-center">
                            <span>${_diaFechaBlog}</span>
                            <p>${_mesFechaBlogNombre}</p>
                        </div>
                    </div>
                    <div class="blog-cap">
                        <p>|   ${_todoBlog[i].etiqueta}</p>
                        <h3><a href="blog.html">${_todoBlog[i].titulo}</a></h3>
                        <a href="blog.html" class="more-btn">Leer más »</a>
                    </div>
                </div>
            </div>
    `
        _miEspacioBlogHtml.appendChild(_divPadre)

    }
});
