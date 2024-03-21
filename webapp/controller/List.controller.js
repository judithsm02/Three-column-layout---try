sap.ui.define([
    //"student00/com/sap/training/ux402/listdetail/ux402listdetail/controller/BaseController", //si ho poso no em mostra res per pantalla
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Device) {
        "use strict";

        return Controller.extend("student00.com.sap.training.ux402.listdetail.ux402listdetail.controller.List", {
            onInit: function () {
                var oList = this.byId("list"); //crea una variable que emmagatzema l'element que s'identifica amb ID "list"
			    this._oList = oList; //crea una variable local 
                this.getView().addEventDelegate({ //permite escuchar eventos específicos en un control (en este caso, la vista) y 
                                                    //ejecutar lógica personalizada cuando esos eventos ocurren.
					onBeforeFirstShow: function () { //funció que es dona abans de la primera view y es el manejador de eventos
						this.getOwnerComponent().oListSelector.setBoundMasterList(this._oList); //obte una referencia al component propietari. 
                                                                                                //establece la lista maestra (master list) que está vinculada (bound) al oListSelector.
                                                                                                
					}.bind(this)  
				});					
			   //this.getRouter().getRoute("masterlist").attachPatternMatched(this._onListMatched, this); 
                                                                                //s'obte una referencia a la ruta "masterlist"
                                                                                //attachPatternMatched: adjunta un manejador de eventos al patternMatched
                                                                                //patternMatched se dispara cuando la URL coincide con el patrón definido en la ruta.
                                                                                //this._onListMatched se ejecutará cuando se cumpla la condición de coincidencia del patrón.

			   // this.getRouter().attachBypassed(this.onBypassed, this);  //
            },

            

            _navigateToCarrierDetails: function(sCarrierId , bReplace){

                this.getRouter().navTo("carrierdetails",{
                    objectId: sCarrierId
				}, bReplace);  

                //la funció pasa dos parametres on sCarrierId es un valor i el bReplace es un boolean que indica 
                //si la navegació de la ruta actual s'ha de reemplaçar en el historial del navegador actual

                //es crea una cadena que representa una ruta de destino de navegacion que es diu carrierdetails. 
                //es un objecte amb una propiertat que es diu objectid i que el seu valor es el scarrierId

                //("carrierdetails",{objectId: sCarrierId}: ES UN OBJECTO: 

            },

            _showDetail: function(oItem) {
                var bReplace=!Device.system.phone; // true si el dispositivo no es un telefono     false= telefono
                var sCarrierId =oItem.getBindingContext().getProperty("Carrid"); //de la taula OItem, li diem que agafi el context de la variable carrid 
                this._navigateToCarrierDetails(sCarrierId,bReplace); //es fa una crida per mostra els details i se li passen les dues variables
            },

            // es mira si la app està running en un movil o en store i s'emmagatzema en una variable

            onSelect: function(oEvent){
                this._showDetail(oEvent.getParameter("listItem") ||oEvent.getSource()); //se le pasa a showdetail un parametro. SI el get parameter de la lista 
                //existe, se pasa ese como oitem. sino, se passa el origen del evento

            },

            onByPassed: function (){
                this._oList.removeSelections(true); //el true indica que la selecció s'ha d'esborrar completament
            },

           
            _onListMatched: function() {
                this.getListSelector().oWhenListLoadingIsDone.then( //
                function(mParams) {
                if (mParams.list.getMode() === "None") { //none vol dir que no hi ha res seleccionat
                return;
                }
                var sObjectId = mParams.firstListitem.getBindingContext().getProperty("Carrid"); // si hi ha alguna cela seleccionada, 
                                            //es crea una nova variable que agafa dels parametres, el primer de la llista, despres recuepra el seu context, 
                                            //i del context s'agafa la porpiertat carrid de la llista
                this._navigateToCarrierDetails(sObjectId,true);
                }.bind(this)
                );
            },










        });
    });

 
    
