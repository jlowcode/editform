/**

 * Form Editform

 *

 * @copyright: Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.

 * @license:   GNU/GPL http://www.gnu.org/copyleft/gpl.html

 */

define(['jquery', 'fab/fabrik'], function (jQuery, Fabrik) {

	'use strict';

	var Editform = new Class({

		Implements: [Events],

		options: {
			formid               : 0,
			table                : 0,			
            elements             : '',
		},
		
		initialize: function (form, options) {
			// Exibe a edição do formulário de acordo com o nível do usuário logado
			if(options.showEditForm) {
				const { baseUrl } = options;
				const { elements } = options;
				const form = document.querySelector('.fabrikForm');

				var modalContent = document.createElement('div');
				modalContent.innerHTML = this.htmlModal(baseUrl);
				form.appendChild(modalContent);

				const labels = Array.from(document.querySelectorAll('label'));
	
				/**
				 * As labels não possui o id de elemento definido no banco de dados, é passado um array de 
				 * elementos que contém os id's recebido em `options.elements` mas é necessário fazer um 
				 * filtro identificando pelo HTMLid e passando o id numérico de controle do banco de dados  
				 * para a label e assim conseguir montar o link para o backend para editar o elemento.
				 */
				labels.forEach((item) => {
					Object.keys(elements).forEach((key)=>{
						if(item.getAttribute("for") === elements[key].HTMLids[0]) {
							item.idElement = key;
						}
					});
				});
				
				const createEditButton = (item) => {				
					var button = document.createElement("i");
					button.className = "icon-edit";
					button.style = "cursor: pointer; ";
					button.title = "Alterar este elemento";
					button.addEventListener ("click", function() {
						const url = `${baseUrl}administrator/index.php?option=com_fabrik&view=element&layout=edit&id=${item.idElement}`;
						document.querySelector('#iframe-url').src = url;
					});
					
					var link = document.createElement("a");
					link.rel = "modal";
					link.href = "#janela";
					link.appendChild(button);
					
					return link;
				}
				
				// Adiciona icone editar em cada elemento
				labels.forEach(item => {	
					item.appendChild(createEditButton(item));
				});
				
				
				// const createElement = () => {				
				// 	const addElement = `
				// 	<a class="addbutton addRecord" href="#">
				// 		<i data-isicon="true" class="icon-plus"></i> Elemento 
				// 	</a>`;
	
				// 	var link = document.createElement("a");
				// 	link.rel = "modal";
				// 	link.href = "#janela";
				// 	link.innerHTML = addElement;
	
				// 	return link;
				// }
	
				// document.querySelector('.nav').appendChild(createElement());
				// form.appendChild(createElement());
	
				jQuery("a[rel=modal]").click(function(ev){
					ev.preventDefault();
					var id = jQuery(this).attr("href");
					var alturaTela  = jQuery(document).height();
					var larguraTela = jQuery(window).width();
			
					jQuery('#mascara').css({'width':larguraTela, 'height':alturaTela});
					jQuery('#mascara').fadeIn(200);
					jQuery('#mascara').fadeTo("slow", 0.2);
			
					var left = (jQuery(window).width() / 2 ) - (jQuery(id).width() / 2 );
					var top  = (jQuery(window).height() / 2 ) - (jQuery(id).height() / 2 );
			
					jQuery(id).css({'left':left, 'top':top});
					jQuery(id).show();
				});
			
				jQuery('#mascara').click(function(){		
					jQuery(this).fadeOut("slow");
					jQuery('.window').fadeOut("slow");
				});
			
				jQuery('.fechar').click(function(ev){		
					ev.preventDefault();		
					jQuery('#mascara').fadeOut(200, "linear");
					jQuery('.window').fadeOut(200, "linear");
					window.location.reload();
				});
			}
			
		
		},
		htmlModal: function(baseUrl) {
			return `
			<style>
				.window{	
					display: none;
					width: 90%;
					height: 90vh;
					position: absolute;
					background: #FFF ;
					left: 0;
					top:0;
					z-index: 9900;
					border-radius: 10px;			
				}
				
				#mascara{				
					display: none;
					position: absolute;
					opacity: 0.2;
					background: #000 ;
					left: 0;
					top:0;
					z-index: 9000;			
				}
				
				.fechar{				
					display: block;
					text-align: right;
				}
			</style>
			<!-- <a href="#janela" rel="Modal">Abrir Janela Modal</a> -->
			<div class="window" id="janela">
				<a href="#" class="fechar" style="margin-right:10px; ">X Fechar</a>
				<iframe id="iframe-url" height="100%" width="100%" src="${baseUrl}/administrator/index.php?option=com_fabrik&view=element&layout=edit" title="W3Schools Free Online Web Tutorials"></iframe>
			</div>
			<div id="mascara"></div>
			`
		}
	});

	return Editform;
});
