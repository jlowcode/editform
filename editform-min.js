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
		
		initialize: function (options) {
			const { baseUrl } = options;
			const { elements } = options;
			const form = document.querySelector('.fabrikForm');

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
				button.addEventListener ("click", function() {
					const url = `${baseUrl}administrator/index.php?option=com_fabrik&view=element&layout=edit&id=${item.idElement}`;
					openNewTab(url);
				});
				return button;
			}
			
			// Adiciona icone editar em cada elemento
			labels.forEach(item => {	
				item.appendChild(createEditButton(item));
			});
			
			
			const createElement = () => {
				var button = document.createElement("input");
				button.type = "button";
				button.value = "+ Elemento";
				button.style = 'margin: 5px 10px 0 0; padding: 10px; color: #fff; ';
				button.className = 'btn btn-success button';
				button.addEventListener ("click", function() {
					const url = `${baseUrl}administrator/index.php?option=com_fabrik&view=element&layout=edit`;
					openNewTab(url);
				});
				return button;
			}

			const openNewTab = (url) => {
				const win = window.open(url, '_blank');
				win.focus();
				
			}
			
			form.appendChild(createElement());
		},
	});

	return Editform;
});