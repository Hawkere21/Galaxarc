import { updateName, updateEmailFirestore, updateEmailAuth, updatePasswordAuth  } from "./firebase.js";
import { uploadFile, getFile, getUrl, deleteFile } from "./supabase.js";


document.getElementById("file").addEventListener("click",function(){
    const correo = document.getElementById("inputEmail").value;
    const name = document.getElementById("inputUsuario").value;
    const password = document.getElementById("inputPassword").value;
    const correoState = document.getElementById("inputEmail").disabled;
    const nameState = document.getElementById("inputUsuario").disabled;
    const passwordState = document.getElementById("inputPassword").disabled;
    const foto = document.getElementById("fotoFile").files;
    let id = localStorage.getItem("id");
    try{

   
    
    if(!(correoState) && !(nameState) && !(passwordState)){
        console.log(correo + name + password);
        updateEA(String(correo));
        updateE(String(correo));
        uploadNameLStorage(updateN(String(name)));
        document.getElementById("nombreCuenta").innerHTML = name;
        updatePass(String(password));        
    }
    else if (!(correoState) && !(nameState)){
        updateEA(String(correo));
        updateE(String(correo));
        uploadNameLStorage(updateN(String(name)));
        document.getElementById("nombreCuenta").innerHTML = name;
    }
    else if (!(correoState) & !(passwordState)){
        updateEA(String(correo));
        updateE(String(correo));
        updatePass(String(password));
    }
    else if (!(nameState) && !(passwordState)){
        uploadNameLStorage(updateN(String(name)));
        document.getElementById("nombreCuenta").innerHTML = name;
        updatePass(String(password));
    }
    else if (!(correoState)){
        updateEA(String(correo));
        updateE(String(correo));
    }
    else if (!(nameState)){
        uploadNameLStorage(updateN(String(name)));
        document.getElementById("nombreCuenta").innerHTML = name;
    }
    else if (!(passwordState)){
        updatePass(String(password));
    }
    if(foto.length > 0){
        uploadFoto(id,foto[0]);
    }
    showModal("Cambiando los datos ...")
}
catch(error){
    showModal("Ocurrio un error, intente de nuevo");
}
})


document.getElementById("emailCheck").addEventListener("click",function(){
    console.log("click");
    const booleanV = document.getElementById("emailCheck").checked;
    habilitarODesabilitarEmail(booleanV);
});





document.getElementById("usuarioCheck").addEventListener("click",function(){
    const booleanV = document.getElementById("usuarioCheck").checked;
    habilitarODesabilitarName(booleanV);
});



document.getElementById("passwordCheck").addEventListener("click",function(){
    const booleanV = document.getElementById("passwordCheck").checked;
    habilitarODesabilitarPassword(booleanV);
});




async function uploadFoto(id,fotoFile){
    deleteFile(id + ".png");
    const res = await uploadFile(fotoFile,id);
    console.log(res)
    const urlRes = await getFile(res.path);
    console.log(urlRes)
    updateFotoBlob(urlRes);
}

function updateFoto(url){
    alert("click");
    document.getElementById("fotoPerfil").src = "";
    document.getElementById("fotoPerfil").src = url;
}


function updateFotoBlob(blob){
    const imgUrl = URL.createObjectURL(blob);
    updateFoto(imgUrl);
}


function updateN(name){
    const id = localStorage.getItem("id");
    updateName(id, name);
};


function updateE(correo){
    const id = localStorage.getItem("id");
    updateEmailFirestore(id, correo);
}




function updateEA(correo){
    updateEmailAuth(correo);
}


function updatePass(password){
    updatePasswordAuth(password);
}


function habilitarODesabilitarEmail(check){
    if(!(check)){
        document.getElementById("inputEmail").disabled = true;
    }
    else{
        document.getElementById("inputEmail").disabled = false
    }
};


function habilitarODesabilitarName(check){
    if(!(check)){
        document.getElementById("inputUsuario").disabled = true;
    }
    else{
        document.getElementById("inputUsuario").disabled = false
    }
};


function habilitarODesabilitarPassword(check){
    if(!(check)){
        document.getElementById("inputPassword").disabled = true;
    }
    else{
        document.getElementById("inputPassword").disabled = false
    }
};


function uploadNameLStorage(name){
    localStorage.setItem;("usuario",name);
};



function setNameUpdate(){
    const name = localStorage.getItem("usuario");
    document.getElementById("nombreCuenta").innerHTML = name;
};


function showModal(message){
    document.getElementById("modalBody").innerHTML = message;
    const modal = new bootstrap.Modal(document.getElementById("notificationModal"))
    modal.show();

}