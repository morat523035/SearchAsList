var tree = [];
function onLoad(ev) {
 	var TBmain = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService().QueryInterface(Components.interfaces.nsIWindowMediator).getMostRecentWindow("mail:3pane");
	tree = TBmain.observeMSD();
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.search-as-list.");
	var toggleThread = prefs.getBoolPref("toggleThread");
        var colShow = prefs.getStringPref("colShow");
        var colClick = prefs.getStringPref("colClick");
	//var para = document.createElement("P");
    //var paratext = document.createTextNode("\u25B2 - ascending. \u25BC - descending");
    //para.appendChild(paratext);
    //document.getElementById("gbclick").appendChild(para);
	for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
		var currElement = currCol.element;
		var currId = currElement.getAttribute("id");
		var currLabel = currElement.getAttribute("label");
		var showcheckbox   = document.createElement('checkbox');
		document.getElementById("gbshow").appendChild(showcheckbox);
		showcheckbox.setAttribute('id', currId + "show");
		showcheckbox.setAttribute('label', currLabel);
		showcheckbox.setAttribute("checked", "false");
		//var clickradiogroup = document.createElement('radiogroup');
		//clickradiogroup.setAttribute('id', currId + "clickrg");
		//clickradiogroup.setAttribute('orient', "horizontal");
		//document.getElementById("gbclick").appendChild(clickradiogroup);
		//var clickradioo = document.createElement('radio');
		//document.getElementById(currId + "clickrg").appendChild(clickradioo);
		//clickradioo.setAttribute('id', currId + "clickro");
		//clickradioo.setAttribute('label', "-");
		//clickradioo.setAttribute("selected", "true");
		//var clickradioa = document.createElement('radio');
		//document.getElementById(currId + "clickrg").appendChild(clickradioa);
		//clickradioa.setAttribute('id', currId + "clickra");
		//clickradioa.setAttribute('label', document.getElementById("togglelabel").value + " : " + currLabel);
		//clickradioa.setAttribute("selected", "false");
		// DEBUG
		// var el = currElement;
		// for (var i = 0, atts = el.attributes, n = atts.length, arr = []; i < n; i++){
		//	 arr.push(atts[i].nodeName);
		//	 arr.push(atts[i].nodeValue);
		// }
		// clickradioo.setAttribute('label',arr.toString());
		// END DEBUG
		//if (currElement.getAttribute("tooltiptext").toLowerCase().indexOf("sort") > -1) {
		if (currElement.getAttribute("id").toLowerCase().indexOf("threadcol") == -1) {
			//clickradioa.setAttribute('label', "\u25B2");
			// MENUS!
			var firstmenuopt = document.createElement('menuitem');
			document.getElementById("sortfirstmp").appendChild(firstmenuopt);
			firstmenuopt.setAttribute("value", currId);
			firstmenuopt.setAttribute("label", currLabel);
			var secondmenuopt = document.createElement('menuitem');
			document.getElementById("sortsecondmp").appendChild(secondmenuopt);
			secondmenuopt.setAttribute('value', currId);
			secondmenuopt.setAttribute('label', currLabel);
			var thirdmenuopt = document.createElement('menuitem');
			document.getElementById("sortthirdmp").appendChild(thirdmenuopt);
			thirdmenuopt.setAttribute('value', currId);
			thirdmenuopt.setAttribute('label', currLabel);
			//var clickradiod = document.createElement('radio');
			//document.getElementById(currId + "clickrg").appendChild(clickradiod);
			//clickradiod.setAttribute('id', currId + "clickrd");
			//clickradiod.setAttribute('label', "\u25BC" + " : " + currLabel);
			//clickradiod.setAttribute("selected", "false");
			
			if (colShow.indexOf(currId) > 0) {
				document.getElementById(currId + "show").checked = "true";
			}
			if (colClick.indexOf(currId+"a") > 0) {
				if (document.getElementById("sortfirstml").selectedIndex < 1) document.getElementById("sortfirstml").value = currId;
				else if (document.getElementById("sortsecondml").selectedIndex < 1) document.getElementById("sortsecondml").value = currId;
				else if (document.getElementById("sortthirdml").selectedIndex < 1) document.getElementById("sortthirdml").value = currId;
				//document.getElementById(currId + "clickrg").selectedIndex = 1;
			}
			if (colClick.indexOf(currId+"o10") > 0) {
				document.getElementById("sortfirstml").value = currId;
			}
			if (colClick.indexOf(currId+"o20") > 0) {
				document.getElementById("sortsecondml").value = currId;
			}
			if (colClick.indexOf(currId+"o30") > 0) {
				document.getElementById("sortthirdml").value = currId;
			}
			if (colClick.indexOf(currId+"d") > 0) {
				if (document.getElementById("sortfirstml").selectedIndex < 1) { 
					document.getElementById("sortfirstml").value = currId;
					document.getElementById("firstsortdir").selectedIndex = 1;
				} else if (document.getElementById("sortsecondml").selectedIndex < 1) {
					document.getElementById("sortsecondml").value = currId;
					document.getElementById("secondsortdir").selectedIndex = 1;
				} else if (document.getElementById("sortsecondml").selectedIndex < 1) {
					document.getElementById("sortthirdml").value = currId;
					document.getElementById("thirdsortdir").selectedIndex = 1;
				}
				//document.getElementById(currId + "clickrg").selectedIndex = 2;
			}
			if (colClick.indexOf(currId+"o11") > 0) {
					document.getElementById("sortfirstml").value = currId;
					document.getElementById("firstsortdir").selectedIndex = 1;
			}
			if (colClick.indexOf(currId+"o21") > 0) {
					document.getElementById("sortsecondml").value = currId;
					document.getElementById("secondsortdir").selectedIndex = 1;
			}
			if (colClick.indexOf(currId+"o31") > 0) {
					document.getElementById("sortthirdml").value = currId;
					document.getElementById("thirdsortdir").selectedIndex = 1;
			}
		} else {
			if (colShow.indexOf(currId) > 0) {
				document.getElementById(currId + "show").checked = "true";
			}
			if (colClick.indexOf(currId+"a") > 0) {
				document.getElementById("toggleThreadprefs").setAttribute("checked", "true");
			}
			//var togglethreadcheckbox   = document.createElement('checkbox');
			//document.getElementById("gbclick").appendChild(togglethreadcheckbox);
			//togglethreadcheckbox.setAttribute('id', currId + "toggle");
			//togglethreadcheckbox.setAttribute('label', currLabel);
			//togglethreadcheckbox.setAttribute("checked", "false");
		}
		//var clickcheckbox = document.createElement('checkbox');
		//document.getElementById("gbclick").appendChild(clickcheckbox);
		//clickcheckbox.setAttribute('id', currId + "click");
		//clickcheckbox.setAttribute('label', currLabel);
		//clickcheckbox.setAttribute("checked", "false");
	}
	// disabled certain checkboxes
	document.getElementById('expandThreadprefs').disabled = toggleThread;
};
function onUnload(ev) {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.search-as-list.");
	var strshow = Components.classes["@mozilla.org/supports-string;1"]
      .createInstance(Components.interfaces.nsISupportsString);
	strshow.data = " ";
	var strclick = Components.classes["@mozilla.org/supports-string;1"]
      .createInstance(Components.interfaces.nsISupportsString);
	strclick.data = " ";
	for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
		var currElement = currCol.element;
		var currId = currElement.getAttribute("id");
		if (document.getElementById(currId + "show").checked) {
			strshow.data = strshow.data + currId + ",";
		}
		//if (document.getElementById(currId + "clickrg").selectedIndex == 1) {
		//	strclick.data = strclick.data + currId + "a,";
		//}
		//if (document.getElementById(currId + "clickrg").selectedIndex == 2) {
		//	strclick.data = strclick.data + currId + "d,";
		//}
		if (currElement.getAttribute("id").toLowerCase().indexOf("threadcol") != -1) {
			if (document.getElementById("toggleThreadprefs").checked) {
				strclick.data = strclick.data + currId + "a,";
			}
		}
	}
	if (document.getElementById("sortfirstml").selectedIndex > 0) {
		strclick.data = strclick.data + document.getElementById("sortfirstml").value + "o1" + document.getElementById("firstsortdir").selectedIndex + ",";
	}
	if (document.getElementById("sortsecondml").selectedIndex > 0) {
		strclick.data = strclick.data + document.getElementById("sortsecondml").value + "o2" + document.getElementById("secondsortdir").selectedIndex + ",";
	}
	if (document.getElementById("sortthirdml").selectedIndex > 0) {
		strclick.data = strclick.data + document.getElementById("sortthirdml").value + "o3" + document.getElementById("thirdsortdir").selectedIndex + ",";
	}
    prefs.setStringPref("colShow", strshow);
        prefs.setStringPref("colClick", strclick);
	// set the rest of the preferences
	prefs.setBoolPref("expandThread",document.getElementById("expandThread").value);
	prefs.setBoolPref("toggleThread",document.getElementById("toggleThread").value);
	prefs.setBoolPref("listTab",document.getElementById("listTab").value);
	prefs.setBoolPref("origTab",document.getElementById("origTab").value);
	prefs.setBoolPref("shortList",document.getElementById("shortList").value);
	prefs.setIntPref("numShort",document.getElementById("numShort").value);
};
