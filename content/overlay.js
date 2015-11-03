/* ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is ImageBlock.
 *
 * The Initial Developer of the Original Code is
 * Hemant Vats.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s): Vincent CARON
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */


var imageblock = {
  init: function() {
    // initialization code
    this.strings = document.getElementById("imageblock-strings");
    var PrefBranch = Components.classes["@mozilla.org/preferences-service;1"]
			.getService(Components.interfaces.nsIPrefBranch);
    var my_button = document.getElementById("imageblock-toolbar-button");	
    if (PrefBranch.getIntPref("permissions.default.image")==2){
      //status=2 means images are blocked
      my_button.checked = true;
      my_button.tooltipText = this.strings.getString("imageblockToolbar.tooltip.show");
    }
    else {
      my_button.checked = false;
      my_button.tooltipText = this.strings.getString("imageblockToolbar.tooltip.block");
    }
  },

  onToolbarButtonCommand: function(e) {
    var PrefBranch = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefBranch);
    var status = PrefBranch.getIntPref("permissions.default.image");	
    var my_button = document.getElementById("imageblock-toolbar-button");	
    if(status==2){
      PrefBranch.setIntPref("permissions.default.image",1);
      my_button.checked = false;
      my_button.tooltipText = this.strings.getString("imageblockToolbar.tooltip.block");
    }
    else {//Blocking images
      PrefBranch.setIntPref("permissions.default.image",2);
      my_button.checked = true;
      my_button.tooltipText = this.strings.getString("imageblockToolbar.tooltip.show");
    }
  }
};

window.addEventListener("load", function() { imageblock.init(); }, true);