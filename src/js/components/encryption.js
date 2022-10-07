window.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.slider');
    const messages = document.querySelector('.messages');
    toggle.addEventListener("click", function() {
        const messagesText = document.querySelectorAll('.message-text');

        messagesText.forEach((elem)=>{
            elem.style.opacity = 0;
        })
        window.setTimeout(
            ()=>{
                messages.classList.toggle("encrypted");
                messagesText.forEach((elem)=>{
                    elem.style.opacity = 1;
                })
            },
            1000
        )
    });
});