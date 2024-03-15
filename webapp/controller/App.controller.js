sap.ui.define(     // es defineixen els moduls ( arxiu en java que té una funcionalitat especifica) 
  [
    //"./BaseController",      //les dependencies son altres moduls que s'han d'executat abans d'aquest modul "app"
    "sap/ui/model/json/JSONModel"

  ],
  function(BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("student00.com.sap.training.ux402.listdetail.ux402listdetail.controller.App", { //es crea una subclase que 
                                                                                            //ve de la classe base Basecontroller. La subaclase es App
      onInit() {
        var oViewModel = new JSONModel({
          layout : "OneColumn"
      });

      this.getView().setModel(oViewModel, "mainView");

      }
    });
  }
);
