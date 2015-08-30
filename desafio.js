var script = document.createElement('script');

script.src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';

document.getElementsByTagName('head')[0].appendChild(script);

window.X = function (json){
	
	var reference = json.data.reference.item; //acessa o produto referência
	var products = json.data.recommendation; //acessa o ramo com as recomendações

	var displayReference = function(){  //mostra produto referência
		var product = createProduct();
		
		var div = document.createElement("div");
		product.appendChild(div);
		
		var list = document.createElement("ul");
		div.appendChild(list);
		
		list.appendChild(createLine(reference.name));
		list.appendChild(createLine("<a href='http:"+reference.detailUrl+"'>Veja aqui!</a>"));
		list.appendChild(createLine("De "+reference.oldPrice));
		list.appendChild(createLine("<span id='newPrice'>Por "+reference.price+"</span>"));
		list.appendChild(createLine(reference.productInfo.paymentConditions));
		
		//insere os atributos do produto referência na lista

	}

        function createProduct(){  
                var product = document.getElementById("reference");
                var div = document.createElement("div");
                div.innerHTML = "<img src = 'http:"+reference.imageName+"'/><br><p> codigo "+reference.businessId+"</p>";
                product.appendChild(div);
                return product;
        } //printa produto referência na página

        var createLine = function(data){ 
                var line = document.createElement("li");
                line.innerHTML = data;
                return line;
	}
        var createDiv = function(data){
                var div = document.createElement("div");
                div.innerHTML = data;
                return div;
        }  
	//será usado algumas vezes na adição dos atributos às listas

        var showAll = function(){
                var body = document.createElement("ul");
                for (var i=0; i<products.length; i++){
                      var line = document.createElement("li");
                      body.appendChild(line);

                      line.appendChild(createDiv("<img src='http:"+products[i].imageName+"'/>"));
                      line.appendChild(createDiv(products[i].name));
                      line.appendChild(createDiv("<a href='http:"+products[i].detailUrl+"'>Veja aqui!</a>"));
		     
		      if(products[i].oldPrice === null){
			    line.appendChild(createDiv(""));
		      }else {
                            line.appendChild(createDiv("<span id='oldPrice'>De "+products[i].oldPrice+"</span>"));
		      } 
			//necessário, por ter alguns itens sem preço antigo

		      line.appendChild(createDiv("<span id='newPrice'>Por "+products[i].price+"</span>"));
		      line.appendChild(createDiv(products[i].productInfo.paymentConditions));
		      line.appendChild(createDiv("codigo "+products[i].businessId));
		}
		//insere os produtos recomendados à lista, e  
		return body;

	}

	$(document).ready(function(){
		var wish = displayReference();
		var body = showAll();
		var container = document.getElementById("container");
		container.innerHTML = "";
		container.appendChild(body);
	});

};
