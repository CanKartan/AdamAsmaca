
class Alert {
    static alertmessage(text,type){
        const alert = document.createElement("div");
        alert.className = type;
        alert.innerHTML = text;
         document.querySelectorAll(".mesaj")[0].appendChild(alert);
         setTimeout(function(){
            alert.remove();
         },3000);
    }
}