let ip1 = document.querySelector('#ip1')
let ip2 = document.querySelector('#ip2')
let btn = document.querySelector('#btn')
let project = document.querySelector('.project')
let comunity = document.querySelector('.comunity')
let code = document.querySelector('.code')
let contrib
let cont = 1;

function geraInfo(value) {
	
	let url = `https://api.github.com/repos/${value}`

	//fetch realiza a requisição
	fetch(url)
	  .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	  .then( function(data){ //aqui vai oq vc faz com a resposta definitiva
	  	
	  	let testeData = new Date(data.updated_at)

	  	console.log(`Teste data: ${testeData}\nData Fetch: ${data.updated_at}\n\n`)
	  	console.log(testeData.getMonth()) 
	  	console.log('\n\n\n')



		let str = `<div class="grid${cont}"><div class="name">${data.name}</div><div class="login"><i class="fa fa-user" aria-hidden="true"></i>
					<span class="loginColor">${data.owner.login}<span></div>
					<div class="create"><i class="fa fa-circle-o" aria-hidden="true"></i>${verificDate(data.created_at)}</div>
					<div class="update"><i class="fa fa-repeat" aria-hidden="true"></i>${verificUpdate(data.updated_at)}</div>`

		let str2 = `<div class="gridCom${cont}"><div class="comDates"><div class="star"><i class="fa fa-star" aria-hidden="true"></i>
					<span class="starColor">${data.stargazers_count}</span></div>
					<div class="fork"><i class="fa fa-code-fork" aria-hidden="true">
					</i><span class="forkColor">${data.forks_count}</span></div></div>`
		contributors(value)
		comiters(value)
		languages(value)
		project.insertAdjacentHTML('beforeend', str)
		comunity.insertAdjacentHTML('beforeend', str2)
		cont++;
		verificUpdate(data.updated_at)
		
		
		

		
		
})

}
function contributors(value) {
	let url = `https://api.github.com/repos/${value}/contributors`
	
	//fetch realiza a requisição
	fetch(url)
	  .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	  .then( function(data){
	  	console.log(data.length)
	  	comunity.insertAdjacentHTML('beforeend', `<div class="gridCom${cont}"><div class="contri"><i class="fa fa-users" aria-hidden="true"></i>${data.length}contributors</div></div></div>`)
	  	
})
}

function comiters(value) {
	let url = `https://api.github.com/repos/${value}/commits`
	
	//fetch realiza a requisição
	fetch(url)
	  .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	  .then( function(data){
	  	console.log(data.length)
	  	code.insertAdjacentHTML('afterbegin', `<div class="comit"><span class="comitColor">${data.length}</span>commits</div>`)
	  	
})
}
function languages (value){
	let url = `https://api.github.com/repos/${value}/languages`
	
	//fetch realiza a requisição
	fetch(url)
	  .then(resposta => resposta.json()) //.then é equivalente ao sucess, o primeiro recebe a resposta e extrai apenas o json útil dela
	  .then( function(data){
	  	let total = Object.entries(data).reduce((x,y)=> x+y[1],0)
	  	console.log(total)
	  	code.insertAdjacentHTML('beforeend', `<div class="gridLan"><div class="languages"><span class="js"><i class="fa fa-language"></i>
	  							<span class="jsColor">JavaScript:</span>${verificLanguage(parseInt((data.JavaScript/total) * 100))}%</span>
	  							<span class="css">CSS:${verificLanguage(parseInt((data.CSS/total) * 100))}%</span>
	  							<span class="html">HTML:${verificLanguage(parseInt((data.HTML/total) * 100))}%</span>
	  							<span class="ruby">Ruby:${verificLanguage(parseInt((data.Ruby/total) * 100))}%</span></div></div></div>`)

})
}

let verificDate = (x=>{
	//let dataUp = new Date(x)
	//return `${dataUp.toDateString().split(' ')[1]} ${dataUp.getDate()}th, ${dataUp.getFullYear()}`
	return dateFns.format(new Date(x), 'ddd Mo, YYYY')
})


let verificUpdate = (x=>{
	return dateFns.distanceInWordsToNow(x)
	
})
const verificLanguage = (x=> x? x: 0)



btn.addEventListener('click', function(event){
	$('h2').css('display','none').slideToggle(200);
	$('.GridProject').css('display','none').slideToggle(200)
	$('.GridComunity').css('display','none').slideToggle(200)
	$('.GridCode').css('display','none').slideToggle(200)

	geraInfo(ip1.value)
	geraInfo(ip2.value)
	$('h2').css('display','block')
	$('.GridProject').css('display','grid')
	$('.GridComunity').css('display','grid')
	$('.GridCode').css('display','grid')
})