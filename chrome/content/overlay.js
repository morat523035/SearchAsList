var tree = [];
function observeMSD() {tree = document.getElementById("threadTree"); return tree;}
observeMSD.BrowserOverlay = {
  /* Observer service. */
  _observerService : null,
  init : function() {
    this._observerService = Components.classes["@mozilla.org/observer-service;1"].
       getService(Components.interfaces.nsIObserverService);
    this._observerService.addObserver(this, "mail-startup-done", false);
  },
  uninit : function() {
    this._observerService.removeObserver(
      this, "mail-startup-done");
  },
  observe : function(aSubject, aTopic, aData) {
    if (aTopic == "mail-startup-done") {
	  	tree = document.getElementById("threadTree");
		var cols = document.getElementById("threadCols");
		var colchild = document.getAnonymousNodes(cols)[1];
		var popup = document.getAnonymousElementByAttribute(colchild, "anonid", "popup");
		var popup2 = document.getAnonymousNodes(popup.lastChild)[3];
		var popupChild = document.createElement("menuitem");
		popupChild.setAttribute("label", "Search as list");
		popupChild.setAttribute("colindex", "4");
		popup2.appendChild(popupChild);
		popupChild.addEventListener("command", onApplyto, true);
    }
  }
}
window.addEventListener("load", function(e) { 
	startup();
	observeMSD.BrowserOverlay.init();
}, false);
window.addEventListener(
  "unload", function() { observeMSD.BrowserOverlay.uninit(); }, false);
var shiftDown = false;
var setShiftDown = function(event){
    if(event.keyCode === 16 || event.charCode === 16){
        shiftDown = true;
    }
};
var setShiftUp = function(event){
    if(event.keyCode === 16 || event.charCode === 16){
        shiftDown = false;
    }
};
window.addEventListener? document.addEventListener('keydown', setShiftDown) : document.attachEvent('keydown', setShiftDown);
window.addEventListener? document.addEventListener('keyup', setShiftUp) : document.attachEvent('keyup', setShiftUp);  
function startup() {
	var tabmail = document.getElementById("tabmail");
	var monitorsearch = {
	    monitorName: "search-as-list",
		// Some are unused, but needed functions
		onTabTitleChanged: function() {},
		onTabClosing: function(tab) 
		{
			if (typeof tab.id != 'undefined') {
				if (tab.id.substring(0,13) == "searchaslist_") {
					var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.search-as-list.");
					var origTab = prefs.getBoolPref("origTab");
					if (!origTab) {
						for (var i = 0; i < document.getElementById("tabmail-tabs").childNodes.length; i++)
						{
							if (document.getElementById("tabmail-tabs").childNodes[i].id == tab.id.replace("searchaslist","searchasfacet")) {
								if (shiftDown) {
									document.getElementById("tabmail-tabs").childNodes[i].hidden = false;
									tabmail.switchToTab(i);
									break;
								} else {
									tabmail.switchToTab(i);
									// select the target node
									var target = document.getElementById("tabmail-tabs");
									 
									// create an observer instance
									var observer = new MutationObserver(function(mutations) {
										mutations.forEach(function(mutation) {
											if (mutation.type === 'childList') {
												//alert(mutation.type);
												document.getElementById("tabmail").closeTab();
												// later, you can stop observing
												observer.disconnect();
											}
									  });    
									});
									 
									// configuration of the observer:
									var config = { childList: true };
									 
									// pass in the target node, as well as the observer options
									observer.observe(target, config);
									break;
								}
							}
						}
					}
				} else {
					// select the target node
					var target = document.getElementById("tabmail-tabs");
					 
					// create an observer instance
					var observer = new MutationObserver(function(mutations) {
						mutations.forEach(function(mutation) {
							if (mutation.type === 'childList') {
								while(document.getElementById("tabmail-tabs").childNodes[document.getElementById("tabmail").tabContainer.selectedIndex].hidden == true) {
									document.getElementById("tabmail").switchToTab(document.getElementById("tabmail").tabContainer.selectedIndex-1);
								}
								// later, you can stop observing
								observer.disconnect();
							}
					  });    
					});
					 
					// configuration of the observer:
					var config = { childList: true };
					 
					// pass in the target node, as well as the observer options
					observer.observe(target, config);
				}
			} else
			{
				// select the target node
				var target = document.getElementById("tabmail-tabs");
				 
				// create an observer instance
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.type === 'childList') {
							while(document.getElementById("tabmail-tabs").childNodes[document.getElementById("tabmail").tabContainer.selectedIndex].hidden == true) {
								document.getElementById("tabmail").switchToTab(document.getElementById("tabmail").tabContainer.selectedIndex-1);
							}
							// later, you can stop observing
							observer.disconnect();
						}
				  });    
				});
				 
				// configuration of the observer:
				var config = { childList: true };
				 
				// pass in the target node, as well as the observer options
				observer.observe(target, config);
			}
		},
		// Unused, but needed functions
		onTabPersist: function() {},
		onTabRestored: function() {},
		onTabSwitched: function() {},
		onTabOpened: function(tab)
		{
			var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.search-as-list.");
			var listTab = prefs.getBoolPref("listTab");
			var origTab = prefs.getBoolPref("origTab");
			var shortList = prefs.getBoolPref("shortList");
			var numShort = prefs.getIntPref("numShort");
			var expandThread = prefs.getBoolPref("expandThread");
			var toggleThread = prefs.getBoolPref("toggleThread");
                        var colShow = prefs.getStringPref("colShow");
                        var colClick = prefs.getStringPref("colClick");
			
			if (tab.mode.type == "glodaSearch" && tab.mode.name == "glodaFacet") {
				var oldtab = tabmail.tabContainer.selectedIndex;
				tabmail.switchToTab(0);
				var tabcont = document.getElementById("tabmail-tabs");
				tabcont.childNodes[oldtab].hidden = true;
				//document.getElementById("searchaslist-indicator").style.display = "-moz-box";
				var show_salindicator  = document.createElement('image');
				// alert(document.activeElement.parentNode.tagName);
				show_salindicator.setAttribute('src', "chrome://global/skin/icons/loading_16.png");
				show_salindicator.setAttribute('id', "searchaslist-indicator");
				document.activeElement.parentNode.insertBefore(show_salindicator,document.activeElement.parentNode.childNodes[1]);
				
				// alert(document.activeElement.tagName);
				salINT = setInterval(function(){
					if(tab.query === undefined) {
					}
					else {
						if(tab.query.completed==false){
						}
						else {
							clearInterval(salINT);
							var msgspot = 1;
							var hide_salindicator = document.getElementById("searchaslist-indicator");
							hide_salindicator.parentNode.removeChild(hide_salindicator);
							//document.getElementById("searchaslist-indicator").style.display = "none";
							// get number of items to compare against the custom threshold set in the options
							numItems = tab.collection.items.length;
							if (listTab || (shortList && (numItems < numShort))) {
								// change tab title to search string - not so simple
                                                                for (let constraint of tab.query._constraints) {
									var tabtitle = tab.searchString;
									if (constraint[1].attributeName == 'involves') {
										tabtitle = constraint[2].value;
										msgspot = 0;
									} else if (constraint[1].attributeName == 'tag') {
										tabtitle = constraint[2].tag;
										msgspot = 0;
									}
								}
								if (tab.collection.items.length > 0) {
									// get first message to show when opening list view
									let aMessage = ((msgspot) ? tab.collection.items[tab.collection.items.length-1] : tab.collection.items[0]);;
									// open list view
									listtab = tabmail.openTab("glodaList", {
										collection: Gloda.explicitCollection(Gloda.NOUN_MESSAGE, tab.collection.items),
										message: aMessage,
										title: tabtitle,
										background: false
									});
									// assign random ids to all tabs
									var tabrand = Math.floor((Math.random()*1000)+1);
									tabcont.childNodes[oldtab].setAttribute("last-tab", "null");
									tabcont.childNodes[oldtab].id = "searchasfacet_" + tabtitle + tabrand;
									tabcont.childNodes[tabmail.tabContainer.selectedIndex].id = "searchaslist_" + tabtitle + tabrand;
									listtab.id = "searchaslist_" + tabtitle + tabrand;
									// include tooltiptext on tab for shift + close to facet view
									var stringsBundle = document.getElementById("search-as-list-messengerOverlay");
									var changeString = stringsBundle.getString('tabTooltiptext');
									var sal_close = document.getAnonymousNodes(tabcont.childNodes[tabmail.tabContainer.selectedIndex]);
									sal_close[0].lastChild.lastChild.tooltipText = changeString;
									
									// hide original facet view tab
									if (origTab) {
										tabcont.childNodes[oldtab].hidden = false;
									}
									// show, hide, and toggle custom columns
									for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
										var currElement = currCol.element;
										var currId = currElement.getAttribute("id");
										var column = tree.columns.getNamedColumn(currId);
										var element = column.element;
										element.setAttribute("hidden", "true")
										if (colShow.indexOf(currId) > 0) {
											element.setAttribute("hidden", "false");
										}
										if (colClick.indexOf(currId + "a") > 0) {
											HandleColumnClick(currId);
										}
										if (colClick.indexOf(currId + "d") > 0) {
											HandleColumnClick(currId);
											HandleColumnClick(currId);
										}
									}
									// third highest priority column sort
									if (colClick.indexOf("o3") > 0) {
									for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
											var currElement = currCol.element;
											var currId = currElement.getAttribute("id");
											if (colClick.indexOf(currId + "o30") > 0 && colClick.indexOf(currId + "o2") < 0 && colClick.indexOf(currId + "o1") < 0) {
												HandleColumnClick(currId);
											}
											if (colClick.indexOf(currId + "o31") > 0 && colClick.indexOf(currId + "o2") < 0 && colClick.indexOf(currId + "o1") < 0) {
												HandleColumnClick(currId);
												HandleColumnClick(currId);
											}
										}
									}
									// second highest priority column sort
									if (colClick.indexOf("o2") > 0) {
										for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
											var currElement = currCol.element;
											var currId = currElement.getAttribute("id");
											if (colClick.indexOf(currId + "o20") > 0 && colClick.indexOf(currId + "o1") < 0) {
												HandleColumnClick(currId);
											}
											if (colClick.indexOf(currId + "o21") > 0 && colClick.indexOf(currId + "o1") < 0) {
												HandleColumnClick(currId);
												HandleColumnClick(currId);
											}
										}
									}
									// highest priority column sort
									if (colClick.indexOf("o1") > 0) {
										for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
											var currElement = currCol.element;
											var currId = currElement.getAttribute("id");
											if (colClick.indexOf(currId + "o10") > 0) {
												HandleColumnClick(currId);
											}
											if (colClick.indexOf(currId + "o11") > 0) {
												HandleColumnClick(currId);
												HandleColumnClick(currId);
											}
										}
									}
									if (!toggleThread && expandThread) gFolderDisplay.doCommand(nsMsgViewCommandType.expandAll);
								}
								else {
									tabcont.childNodes[oldtab].hidden = false;
									tabmail.switchToTab(oldtab);
								}
							}
							else {
									tabcont.childNodes[oldtab].hidden = false;
									tabmail.switchToTab(oldtab);
							}
						}
					}
				},50);
			}
		}
	};
	tabmail.registerTabMonitor(monitorsearch);
}
function onApplyto() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.search-as-list.");
	var strshow = Components.classes["@mozilla.org/supports-string;1"]
      .createInstance(Components.interfaces.nsISupportsString);
	strshow.data = " ";
	for (var currCol = tree.columns.getFirstColumn(); currCol; currCol = currCol.getNext()) {
		var currElement = currCol.element;
		var currId = currElement.getAttribute("id");
		if (document.getElementById(currId).hidden == false) {
			strshow.data = strshow.data + currId + ",";
		}
	}
    prefs.setStringPref("colShow", strshow);
	var column = tree.columns[4];
    if (column) {
	 var element = column.element;
	 if (element.getAttribute("hidden") == "true")
	   element.setAttribute("hidden", "false");
	 else
	   element.setAttribute("hidden", "true");
    }
};
