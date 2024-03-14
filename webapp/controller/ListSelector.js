
sap.ui.define([
    "sap/ui/base/Object"
   ], function(BaseObject) {
   "use strict";
   
   return BaseObject.extend("student00.com.sap.training.ux402.listdetail.ux402listdetail.controller.ListSelector", 
    {
        constructor: function() {  
            this._oWhenListHasBeenSet = new Promise(function (fnResolveListHasBeenSet) {
                this._fnResolveListHasBeenSet = fnResolveListHasBeenSet; // aqui le dices guarda la funcion de este contexto de esta funcion en otra variable

            }.bind(this));  // compreba que la lista dentro del contexto de esa funcion es igual al exterior. las junta. no las compara 

            // le haces una promise de que se avisará caundo al lista esté creada
             
			this.oWhenListLoadingIsDone = new Promise(function (fnResolve, fnReject) { // es crea una nova promesa que s'inciara quan hagi acabat de carregar la llista
				this._oWhenListHasBeenSet
					.then(function (oList) {
                         // aleshores inicialitza la funció  
						oList.getBinding("items").attachEventOnce("dataReceived",
							function (oData) {
								if (!oData.getParameter("data")) {  // es mira si el valor odata té el els parametre data. sino es aixi, salta error. es error de mosrtar dades, no de que no tingui dades 
									fnReject({
										list : oList,
                                        error: true
									});
								}
                                var oFirstListItem = oList.getItems()[0]; //primer elemento de la lista.
                                if(oFirstListItem) {
                                    fnResolve({
                                        list: oList,
                                        oFirstListItem: oFirstListItem
                                        
                                    })
                                }
                                else {
									// si no hi ha primer element es reject.  
									fnReject({
										list : oList,
                                        error: false
									});
								}
							}
						);
					});
			}.bind(this)); 
		},

        setBoundMasterList: function (oList){
            this._oList=oList;
            this. _fnResolveListHasBeenSet(oList);
         },

         selectAListItem: function (sBindingPath){
            this.oWhenListLoadingIsDone.then(
                function(){
                    var oList=this._oList,
                    oSelectedItem;

                    if(oList.getMode()==="None") // comproba que realment hi ha alguna cosa seleccionada
                    {
                        return;
                    }
                    oSelectedItem = oList.getSelectedItem();

					// skip update if the current selection is already matching the object path
					if (oSelectedItem && oSelectedItem.getBindingContext().getPath() === sBindingPath) {
						return;
					}

					oList.getItems().some(function (oItem) {
						if (oItem.getBindingContext() && oItem.getBindingContext().getPath() === sBindingPath) {
							oList.setSelectedItem(oItem);
							return true;
						}
					});
				}.bind(this));
		},

		clearMasterListSelection: function() {
			this._oWhenListHasBeenSet.then(function() {
				this._oList.removeSelections(true);
			}.bind(this));
		}
	});
});