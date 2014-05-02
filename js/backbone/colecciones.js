//Coleccion de Noticias
var ColeccionNoticias = Backbone.Collection.extend({
	model: Noticia
});

//Instancia de la Colección de Noticias
var noticias = new ColeccionNoticias();

//Coleccion de Comentarios
var ColeccionComentarios = Backbone.Collection.extend({
	model: Comentario
});

//Instancia de la Coleccion de Comentarios
var comentarios = new ColeccionComentarios();
