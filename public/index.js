$(
    () => {
        const socket = io()
        let username
        $("#form1").on("submit", () => {
            if(username)
            socket.emit("chat msg", $("#msg").val())
            else {
                username = $("#msg").val()
                socket.emit("chat msg", $("#msg").val())
            }
            return false
        })

        socket.on("chat msg", msg => $("#messages").append($("<li>").text(msg)))
    }
)