// -------------------------------------------------------------------------------------------------
function trim(s) {
	return s.replace(/(^\s+)|(\s+$)/g, "");
}

function hasClassName(oNode, className) {
	if (!oNode)
		return false;
	return (oNode.nodeType==1)?((" "+oNode.className+" ").indexOf(" "+className+" ")!=-1):false;
}

function addClassName(oNode,className) {
	if (!oNode)
		return;
	if ((oNode.nodeType==1) && !hasClassName(oNode,className))
		oNode.className = trim(oNode.className+" "+className);
}

function deleteClassName(oNode,className) {
	if (!oNode)
		return;
	if (oNode.nodeType==1 && hasClassName(oNode,className))
		oNode.className = trim((" "+oNode.className+" ").replace(" "+className+" "," "));
}

// -------------------------------------------------------------------------------------------------
function winPopApplication(url, width, height, isScrollable) {
	if (width == null) width = '800';
	if (height == null) height = '450';
    if (navigator.userAgent.match(/Windows Phone|iPhone|iPad|iPod|Android/i))
    {
	    popupwinApplication = window.open (url, '',	  'toolbar=no'
												+ ',directories=no'
												+ ',status=no'
												+ ',scrollbars='+(isScrollable?'yes':'no')
												+ ',menubar=yes'
	    									);
    }
    else
    {
        if (navigator.userAgent.match(/MSIE 8/i))
        {

        	popupwinApplication = window.open (url, '',	  'toolbar=no'
			    									+ ',width=972'
		    										+ ',height=450'
				    								+ ',directories=no'
					    							+ ',status=no'
						    						+ ',scrollbars='+(isScrollable?'yes':'no')
							    					+ ',menubar=yes'
								        		);
         }
        else
         {
	        popupwinApplication = window.open (url, '',	  'toolbar=no'
			    									+ ',width='+width
				    								+ ',height='+height
					    							+ ',directories=no'
						    						+ ',status=no'
							    					+ ',scrollbars='+(isScrollable?'yes':'no')
								    				+ ',menubar=yes'
									        	);
          }
     }
	if (popupwinApplication && popupwinApplication.focus) popupwinApplication.focus();
	return false;
}
function NoErrorLMDP () {

        var msg = document.getElementById('LMDP_message_error');
        if (msg) { addClassName(msg, 'invisible'); }

        msg = document.getElementById('LMDP_timeout_error');
        if (msg) { addClassName(msg, 'invisible'); }

        var isErreur = false;
        var compteurErreur = 0;

        var nomChamps = ['LMDP_Spi','LMDP_Password'];

addClassName(document.getElementById('LMDP_saisie_obligatoire_texte'), 'invisible');
addClassName(document.getElementById('LMDP_saisie_obligatoire_error'), 'invisible');
addClassName(document.getElementById('LMDP_bloque'), 'invisible');

for  (i=0; i<=1; i++)
   {
	   document.getElementById(nomChamps[i]+'_tmp').value='';
	   addClassName(document.getElementById(nomChamps[i]+'_error'), 'invisible');
	   deleteClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
	   addClassName(document.getElementById(nomChamps[i]+'_img_error'), 'invisible');
   }

return;
}

function NoError3S () {
var nomChamps = ['spi','teledec','rfr'];
var msg = document.getElementById('message_error');
if (msg) { addClassName(msg, 'invisible'); }

msg = document.getElementById('timeout_error');
if (msg) { addClassName(msg, 'invisible'); }

addClassName(document.getElementById('saisie_obligatoire_texte'), 'invisible');
addClassName(document.getElementById('saisie_obligatoire_error'), 'invisible');

for  (i=0; i<=2; i++)
   {
	   document.getElementById(nomChamps[i]+'_tmp').value='';
	   addClassName(document.getElementById(nomChamps[i]+'_error'), 'invisible');
	   deleteClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
	   addClassName(document.getElementById(nomChamps[i]+'_img_error'), 'invisible');
   }

return;
}

// -------------------------------------------------------------------------------------------------
function envoi()
{
	var msg = document.getElementById('message_error');
	if (msg) { addClassName(msg, 'invisible'); }

	msg = document.getElementById('timeout_error');
	if (msg) { addClassName(msg, 'invisible'); }

	var isErreur = false;
	var compteurErreur = 0;

	var longueurChamps = ["13", "7", "1,8"];
	var nomChamps = ['spi','teledec','rfr'];

    // une seule mire en 2014     NoErrorLMDP();
	for (i=0; i<=2; i++)
	{
		if (!document.getElementById(nomChamps[i]+'_tmp') || document.getElementById(nomChamps[i]+'_tmp').value=='')
		{
			isErreur = true;
			compteurErreur++;
			deleteClassName(document.getElementById(nomChamps[i]+'_img_error'), 'invisible');
		}
		else addClassName(document.getElementById(nomChamps[i]+'_img_error'), 'invisible');
	}

	if (isErreur)
	{
		var pluriel = '';
		var compteurTexte = '';

		if (compteurErreur>1)
		{
			pluriel = 's';
			compteurTexte = ' '+compteurErreur;
		}

		document.getElementById('saisie_obligatoire_comptage').innerHTML = 'le'+pluriel+compteurTexte+' champ'+pluriel+' signal&eacute;'+pluriel;
		addClassName(document.getElementById('saisie_obligatoire_texte'), 'invisible');
		deleteClassName(document.getElementById('saisie_obligatoire_error'), 'invisible');
	}
	else
	{
		deleteClassName(document.getElementById('saisie_obligatoire_texte'), 'invisible');
		addClassName(document.getElementById('saisie_obligatoire_error'), 'invisible');
	}

	for (i=0; i<=2; i++)
	{
		Expression = new RegExp("^[0-9]{"+longueurChamps[i]+"}$");
		if (document.getElementById(nomChamps[i]+'_tmp').value!='' && !Expression.test(document.getElementById(nomChamps[i]+'_tmp').value))
		{
			isErreur = true;
			deleteClassName(document.getElementById(nomChamps[i]+'_error'), 'invisible');
			addClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
		}
		else
		{
			addClassName(document.getElementById(nomChamps[i]+'_error'), 'invisible');
			deleteClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
		}
	}

	if (!isErreur)
	{
		for (i=0; i<=2; i++)
		{
			document.getElementById(nomChamps[i]).value = document.getElementById(nomChamps[i]+'_tmp').value;
			document.getElementById(nomChamps[i]+'_tmp').value = '';
		}

		addClassName(document.getElementById('annuler'), 'invisible');
		addClassName(document.getElementById('acces_identifiant'), 'invisible');
		addClassName(document.getElementById('acces_msp'), 'invisible');
		deleteClassName(document.getElementById('connexion_en_cours'), 'invisible');

		return true;
	}
	else return false;
}
// -------------------------------------------------------------------------------------------------
function envoiLP()
{
	var msg = document.getElementById('LMDP_message_error');
	if (msg) { addClassName(msg, 'invisible'); }

	msg = document.getElementById('LMDP_timeout_error');
	if (msg) { addClassName(msg, 'invisible'); }

	var isErreur = false;
	var compteurErreur = 0;

	var longueurChamps = ["13", "8,20"];
	var nomChamps = ['LMDP_Spi','LMDP_Password'];
	var nomChampsTmp = ['LMDP_Spi_tmp','LMDP_Password_tmp'];
	var typeChamps = ['N','A'];
	
        var chiffres = "0-9" ;
        var lettres = "a-zA-Z";
        var alpha = "0-9a-zA-Z" ;
        var special="#\$\!%&\*\+-\/=\?\^_\'\.\{\}\|" ;
        var testContenu;
    // une seule mire en 2014     NoError3S();
	for (i=0; i<=1; i++)
	{
		//if (!document.getElementById(nomChamps[i]+'_tmp') || document.getElementById(nomChamps[i]+'_tmp').value=='')
		if (!document.getElementById(nomChampsTmp[i]) || document.getElementById(nomChampsTmp[i]).value=='')
		{
			isErreur = true;
			compteurErreur++;
			deleteClassName(document.getElementById(nomChamps[i]+'_img_error'), 'invisible');
		}
		else addClassName(document.getElementById(nomChamps[i]+'_img_error'), 'invisible');
	}
	
	if (isErreur)
	{
		var pluriel = '';
		var compteurTexte = '';
		
		if (compteurErreur>1)
		{
			pluriel = 's';
			compteurTexte = ' '+compteurErreur;
		}
		
		document.getElementById('LMDP_saisie_obligatoire_comptage').innerHTML = 'le'+pluriel+compteurTexte+' champ'+pluriel+' signal&eacute;'+pluriel;
		addClassName(document.getElementById('LMDP_saisie_obligatoire_texte'), 'invisible');
		deleteClassName(document.getElementById('LMDP_saisie_obligatoire_error'), 'invisible');
	}
	else
	{
		deleteClassName(document.getElementById('LMDP_saisie_obligatoire_texte'), 'invisible');
		addClassName(document.getElementById('LMDP_saisie_obligatoire_error'), 'invisible');
	}
	
	for (i=0; i<=1; i++)
	{
		if (typeChamps[i]=='N')
                  {
			Expression = new RegExp("^[0-9]{"+longueurChamps[i]+"}$");
                        //testContenu=Expression.test(document.getElementById(nomChamps[i]+'_tmp').value);
                        testContenu=Expression.test(document.getElementById(nomChampsTmp[i]).value);
                  }
                 else
                  {
                      	if (typeChamps[i]=='A')
                        {
      				 Expression = new RegExp("^["+alpha+special+"]"+"{"+longueurChamps[i]+"}$");
      				 Expression2 = new RegExp("^.*["+lettres+"].*$");
      				 Expression3 = new RegExp("^.*["+chiffres+"].*$");
                                 //testContenu=Expression.test(document.getElementById(nomChamps[i]+'_tmp').value) && Expression2.test(document.getElementById(nomChamps[i]+'_tmp').value) && Expression3.test(document.getElementById(nomChamps[i]+'_tmp').value) ;
                                 testContenu=Expression.test(document.getElementById(nomChampsTmp[i]).value) && Expression2.test(document.getElementById(nomChampsTmp[i]).value) && Expression3.test(document.getElementById(nomChampsTmp[i]).value) ;
                        }
                  }   
		//if (document.getElementById(nomChamps[i]+'_tmp').value!='' && !testContenu )
		if (document.getElementById(nomChampsTmp[i]).value!='' && !testContenu )
		{
			isErreur = true;
			deleteClassName(document.getElementById(nomChamps[i]+'_error'), 'invisible');
			//addClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
			addClassName(document.getElementById(nomChampsTmp[i]), 'border_error');
		}
		else
		{
			addClassName(document.getElementById(nomChamps[i]+'_error'), 'invisible');
			//deleteClassName(document.getElementById(nomChamps[i]+'_tmp'), 'border_error');
			deleteClassName(document.getElementById(nomChampsTmp[i]), 'border_error');
		}
	}

	if (!isErreur)
	{
		for (i=0; i<=1; i++)
		{
			//document.getElementById(nomChamps[i]).value = document.getElementById(nomChamps[i]+'_tmp').value;
			document.getElementById(nomChamps[i]).value = document.getElementById(nomChampsTmp[i]).value;
			//document.getElementById(nomChamps[i]+'_tmp').value = '';
		}
	
		addClassName(document.getElementById('annuler'), 'invisible');
		addClassName(document.getElementById('acces_loginMDP'), 'invisible');
		addClassName(document.getElementById('acces_msp'), 'invisible');
		deleteClassName(document.getElementById('connexion_en_cours'), 'invisible');

                document.getElementByName('LMDP_formulaire').submit();
    	return true;
	}
	else return false;
}
