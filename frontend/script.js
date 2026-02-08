document.getElementById("contactForm").addEventListener("submit",async e=>{
e.preventDefault();
const data={name:name.value,email:email.value,message:message.value};
const res=await fetch("http://localhost:3000/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
document.getElementById("response").innerText=await res.text();
});