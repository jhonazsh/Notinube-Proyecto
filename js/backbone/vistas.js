//Vista Principal
		var VistaNoticiaPrincipal = Backbone.View.extend({
			el: '#lista-noticias',

			initialize: function(){
				noticias.on('add', this.agregando);
				noticias.add(servidorNoticia);

				var vistaFormulario = new VistaFormularioRegistro();

			},

			agregando: function(modelo){
				var vista1 = new VistaNoticia({model:modelo});
				$('#lista-noticias').append(vista1.$el);
				
				//var vistaDefecto = new VistaNoticiaDefecto({model:modelo});
				
			}
		});

		var VistaNoticia = Backbone.View.extend({
			template: _.template($('#noti').html()),

			events:{
				'click #leer-mas1': 'leerMas',
				'click #comentar': 'comentar'
			},

			initialize: function(){
				this.render();
			},

			render: function(){
				this.$el.html(this.template(this.model.toJSON()));
			},

			leerMas: function(){
				var vista2 = new VistaDetalle({model:this.model});
			},

			comentar: function(){
				var vistaEnvioComentario = new VistaEnvioComentario({model:this.model});
				var vista3 = new VistaDetalle({model:this.model});

			}
		});

		//Vista de Detalle de Noticia por Defecto
		var VistaNoticiaDefecto = Backbone.View.extend({
			el: '#info',

			template: _.template($('#noti-defecto').html()),

			initialize: function(){
				this.render();
			},

			render: function(){
				this.$el.html(this.template(this.model.toJSON()));

				/*$(window).on('scroll', dale);

				

				function dale(){
					//$(this).slideUp();
					var scrollBajas = $(this).scrollTop();
					console.log(scrollBajas);
					var info = $('#info').offset();
					var topsi = info.top;

					console.log(topsi);

					if(scrollBajas<topsi){
						
						$('.imagen-noti').fadeIn(300);
					}
					else{
						$('.imagen-noti').fadeOut(300);
						//$(window).off();
					}
					
				}*/
			}
		});

		var VistaFormularioRegistroDatos = Backbone.View.extend({
			el: '#info', 

			template: _.template($('#form-registro-datos').html()),

			initialize: function(){
				this.render();
			},

			render: function(){
				this.$el.html(this.template);
			}
		});

		var VistaFormularioRegistro = Backbone.View.extend({
			el: '#info', 

			template: _.template($('#form-registro').html()),

			events:{
				'click #reg': 'mostrarRegistro',
			},

			initialize: function(){
				this.render();
			},

			render: function(){
				this.$el.html(this.template);
			},

			mostrarRegistro: function(){
				var vistaFormularioRegistro = new VistaFormularioRegistroDatos();

			}
		});

		

		//Vista de Detalle de Noticia
		var VistaDetalle = Backbone.View.extend({
			el: '#info',

			template: _.template($('#noti-defecto').html()),

			initialize: function(){
				this.render();
			},

			render: function(){
				console.log(this.model.toJSON());
				this.$el.html(this.template(this.model.toJSON()));

				/*$(window).on('scroll', dale);

				

				function dale(){
					//$(this).slideUp();
					var scrollBajas = $(this).scrollTop();
					console.log(scrollBajas);
					var info = $('#info').offset();
					var topsi = info.top;

					console.log(topsi);

					if(scrollBajas<topsi){
						
						$('.imagen-noti').fadeIn(500);
					}
					else{
						$('.imagen-noti').fadeOut(300);
						//$(window).off();
					}
					
				}*/
			}
		});

		//Vista de Envio de Comentario
		var VistaEnvioComentario = Backbone.View.extend({
			el:'#lista-noticias',

			events:{
				'click #leer-mas1': 'leerMas',
				'click #registrar': 'enviarComentario',
			},

			template: _.template($('#noti-comentario').html()),

			initialize: function(){
				console.log('comentario');
				this.render();
			},

			render: function(){
				console.log('yaaa');
				this.$el.html(this.template(this.model.toJSON()));
			},

			leerMas: function(){
				console.log('estoy en comentario y quiero leer mas');
				var vista2 = new VistaDetalle({model:this.model});
			},

			enviarComentario: function(){
				console.log('enviado');
				var c = $('#contenido').val();
				$('#contenido').val('');

				var ahora = new Date();
				var stringAhora = ahora.toLocaleString(); 
				

				if(ahora.getHours()>=12){
					console.log(stringAhora+' pm');
					var h = stringAhora+' pm';

				}

				else{
					console.log(stringAhora+' am');
					var h = stringAhora+' am';
				}
				
				var co = comentarios.create({
					comentario: c,
					tiempo: h
				});

				console.log(co);	

			}
		});

		//Vista Principal de Comentario
		var VistaComentario = Backbone.View.extend({
			el: '#comentando',

			initialize: function(){
				comentarios.on('add', this.agregandoComentario);
				comentarios.add(servidorComentario);
				console.log('listo');
			},

			agregandoComentario: function(modelo){
				var vistaMuestraComentario = new VistaMuestraComentario({model:modelo});
				$('#comentando').append(vistaMuestraComentario.$el);
			}

		});	

		//Vista de Mostrado del Comentario
		var VistaMuestraComentario = Backbone.View.extend({
			template: _.template($('#comentarios-plus').html()),

			initialize: function(){
				this.render();
			},

			render: function(){
				console.log(this.model.toJSON());
				this.$el.html(this.template(this.model.toJSON()));
				var contadorNoticias = _.size(comentarios);
				$('#contador-noticias').text(contadorNoticias);
			}
		});

		//Vista de Mostrado del top de noticias
		/*var VistaTopNoticias = Backbone.View.extend({
			el: '.menusito',

			events: {
				'click #top': 'muestraTop'
			},

			initialize: function(){
				this.render();
			},

			render: function(){
				console.log('hola top');
			},

			muestraTop: function(modelo){
				
				console.log('hola mostrado top');
				var vistaPrincipalTop = new VistaNoticiaPrincipal();
				$('#top').off();

			}
		});*/

		
		var vistaComentario = new VistaComentario();
		//var vistaTop = new VistaTopNoticias();
		var vista1 = new VistaNoticiaPrincipal();

		
		