$(document).ready(function () {
    var radioValues = {
        "foto1": "",
        "foto2": "",
        "foto3": "",
        "foto4": "",
    }

    $("input:radio").click(function () {
        var radioClicked = $(this);
        var clickedName = radioClicked.attr("name"); //foto1, foto2, etc.
        var clickedValue = radioClicked.attr("value"); //avion, pretzel, etc.
        
        // Si se pulsa sobre el mismo icono se desmarca
        if(radioValues[clickedName] == clickedValue){
            radioClicked.prop("checked", false);
            radioValues[clickedName] = "";
        } else {
            repeticionesValue = 0;
            
            // Mira el numero de veces que se repite un icono marcado
            for (var value in radioValues) {
                if(radioValues[value] == clickedValue)
                    repeticionesValue++;
            }
            
            // Si se repite el icono elegido se deniega el click
            if (repeticionesValue > 0) {
                radioClicked.prop("checked", false);
                alert(`No se puede seleccionar dos veces el icono ${clickedValue}`);
            } else { // Si no se repite el icono se acepta el click
                radioValues[clickedName] = clickedValue;
            }
        }

        comprobarFotos();
    });

    function comprobarFotos() {
        console.log(radioValues);
        var btn = $("#reiniciar"); 

        if (Object.values(radioValues).indexOf("") == -1){
            btn.show();
            console.log('Botón salvaje aparecío 👀');
        } else if (btn.is(":visible")) {
            btn.hide();
            console.log('Botón ocultado 🙈');
        }
    }
});