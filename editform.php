<?php

/**

 * Editform

 *

 * @package     Joomla.Plugin

 * @subpackage  Fabrik.form.editform

 * @copyright   Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.

 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html

 */



// No direct access

defined('_JEXEC') or die('Restricted access');



/**

 * other records in the table to auto fill in the rest of the form with that records data

 *

 * Does not alter the record you search for but creates a new record

 *

 * @package     Joomla

 * @subpackage  Fabrik

 * @author      Rafael Dias Soares - rafaelds.89@gmail.com

 * @copyright   Copyright (C) 2005-2016  Media A-Team, Inc. - All rights reserved.

 * @license     GNU/GPL http://www.gnu.org/copyleft/gpl.html

 */



// Require the abstract plugin class

require_once COM_FABRIK_FRONTEND . '/models/plugin-form.php';

/**

 * Allows you to observe an element, and when it its blurred asks if you want to lookup related data to fill

 * into additional fields

 *

 * @package     Joomla.Plugin

 * @subpackage  Fabrik.form.editform

 * @since       3.0

 */

class PlgFabrik_FormEditform extends PlgFabrik_Form{

	public function onLoad(){
		$params = $this->getParams();
		$formModel = $this->getModel();
		$groupView = $formModel->groupView;

		return true;
	}



	/**
	 * Inject new element button in top content
	 *
	 * @return void
	 */
	public function getTopContent()
	{
		//Add style to tooltipElement

		$this->html = $this->createButtonNewElement();
		return true;
	}
	
	/**
	 * Inject new element button in bottom content
	 *
	 * @return void
	 */
	public function getBottomContent()
	{
		$this->html = $this->createButtonNewElement();
		return true;
	}


	public function onAfterJSLoad() {
		$params = $this->getParams();
		$formModel = $this->getModel();		
		$showEditForm = false;

		$user = JFactory::getUser();
		$levels = JAccess::getAuthorisedViewLevels($user->id);
		
		if (in_array($params->get('editform_user_level', NULL), $levels)) {
			$showEditForm = true;
		}

		$opts = new stdClass;	
		$opts->showEditForm = $showEditForm;
		$opts->baseUrl = JUri::base();
		$opts->params = $params;
		$opts->formid = $formModel->getId();
		$opts->table = $params->get('formplus_table', '');		
		$opts->elements = $this->getGroupElements($formModel->groups);
		$opts = json_encode($opts);	
		$container = $formModel->jsKey();

		$this->formJavascriptClass($params, $formModel);
		$formModel->formPluginJS['Editform'] = "new Editform($container, $opts)";
	}

	public function getGroupElements($groups) {
		foreach ($groups as $key => $value) {
			$elements = $groups[$key]->elements;
	   	}

		return $elements;
	}

	public function createButtonNewElement() {
		return '<a rel="modal" title="Adicionar novo elemento" href="#janela"><i data-isicon="true" class="icon-plus"></i></a>';
	}
}
