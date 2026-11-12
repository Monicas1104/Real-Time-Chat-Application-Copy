const socket = io("http://localhost:3000");

// Ask for username
let username = prompt("Enter your name:") || "Anonymous";

// Send message
function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();

    if (message !== "") {
        socket.emit("send_message", {
            user: username,
            text: message
        });
        input.value = "";
    }
}

// Receive and display message
socket.on("receive_message", (data) => {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.innerText = `${data.user}: ${data.text}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
