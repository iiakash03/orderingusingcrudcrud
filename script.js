let submit=document.getElementById("submit");
submit.addEventListener('click',submitBtn);

window.addEventListener('DOMContentLoaded',loadContent);

function loadContent(){
    axios.get('https://crudcrud.com/api/79a00bc899d64fbb9461da5db0b96b02/seller')
    .then((response)=>{
        
        for(let i=0;i<response.data.length;i++){
            showItem(response.data[i]);
        }

    })

    
}

function submitBtn(e){
    e.preventDefault();
    let product=document.getElementById("product").value;
    let price=document.getElementById("price").value;
    let category=document.getElementById("items").value;

    let obj={
        product:product,
        price:price,
        category:category
    }


    axios.post('https://crudcrud.com/api/79a00bc899d64fbb9461da5db0b96b02/seller',{
        product:product,
        price:price,
        category:category
    }
    )
    .then((response)=>{showItem(response.data)});
   

}
function updateUser(id){
    axios.get(`https://crudcrud.com/api/79a00bc899d64fbb9461da5db0b96b02/seller/${id}`)
    .then((response)=>{
        let categ=response.data;

   document.getElementById("product").value=categ.product;
    document.getElementById("price").value=categ.price;
   document.getElementById("items").value=categ.category;
   deleteUser(id);
})
}

function deleteUser(id){
    axios.get(`https://crudcrud.com/api/79a00bc899d64fbb9461da5db0b96b02/seller/${id}`)
    .then((response)=>{
        let categ=response.data;
    
    if(categ.category==='Electronics'){
        let parent=document.getElementById("listelect");
        parent.removeChild(document.getElementById(id));
        deletefromback(id);
    }else if(categ.category==='Skincare'){
        let parent=document.getElementById("listskin");
        parent.removeChild(document.getElementById(id));
        deletefromback(id);
    }if(categ.category==='Carparts'){
        let parent=document.getElementById("listcar");
        parent.removeChild(document.getElementById(id));
        deletefromback(id);
    }if(categ.category==='clothing'){
        let parent=document.getElementById("listcloth");
        parent.removeChild(document.getElementById(id));
        deletefromback(id);
    }
})
   
}

function deletefromback(id){
    axios.delete(`https://crudcrud.com/api/79a00bc899d64fbb9461da5db0b96b02/seller/${id}`)
}




function showItem(newObj){
    document.getElementById("product").value="";
     document.getElementById("price").value="";
    document.getElementById("items").value="";
    const childHTML=`<li id=${newObj._id}> ${newObj.product}-${newObj.price}
    <button class="btn btn-danger" onclick=deleteUser('${newObj._id}')> delete </button>
    <button onclick=updateUser('${newObj._id}')> Update </button>
    </li>`
    
    if(newObj.category==='Electronics'){
        let element=document.getElementById("listelect");
        element.innerHTML=element.innerHTML+childHTML;
    }else if(newObj.category==='Skincare'){
        let element=document.getElementById("listskin");
        element.innerHTML=element.innerHTML+childHTML;
    }else if(newObj.category==='Carparts'){
        let element=document.getElementById("listcar");
        element.innerHTML=element.innerHTML+childHTML;
    }else if(newObj.category==='clothing'){
        let element=document.getElementById("listcloth");
        element.innerHTML=element.innerHTML+childHTML;
    }

}


