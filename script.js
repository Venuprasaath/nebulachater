document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  
    // Initialize with the first chat
    switchChat('jane');
  
    // Add event listener for Enter key to send message
    document.getElementById("messageInput").addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  });
  
  const chats = {
    jane: [],
    john: [],
    eve: []
  };
  
  const profilePics = {
    jane: 'taj.jpeg',
    john: 'taj.jpeg',
    eve: 'profile_eve.jpg',
    self: 'licensed-image.jpeg'
  };
  
  function sendMessage() {
    const messageInput = document.getElementById("messageInput");
    const messageContainer = document.getElementById("message-container");
    const progressBar = document.getElementById("progress-bar");
  
    const messageText = messageInput.value;
    if (messageText.trim() === "") return;
  
    const chatTitle = document.getElementById("chat-title").textContent;
    const contact = chatTitle.split(' ')[2].toLowerCase();
  
    const message = {
      text: messageText,
      type: 'sent',
      profilePic: profilePics.self
    };
  
    chats[contact].push(message);
  
    // Create the message element
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "sent");
  
    const imgElement = document.createElement("img");
    imgElement.src = message.profilePic;
    imgElement.alt = "Profile Picture";
    imgElement.classList.add("profile-pic");
  
    const textElement = document.createElement("span");
    textElement.innerText = messageText;
  
    messageElement.appendChild(imgElement);
    messageElement.appendChild(textElement);
  
    messageElement.style.opacity = "0";
    messageContainer.appendChild(messageElement);
    setTimeout(() => (messageElement.style.opacity = "1"), 50);
  
    messageInput.value = "";
    animateProgressBar(progressBar);
  
    setTimeout(() => receiveMessage("Hi How are You"), 2000);
    setTimeout(() => receiveMessage("what about ur family"), 3000);
  }
  
  function receiveMessage(text) {
    const messageContainer = document.getElementById("message-container");
    const chatTitle = document.getElementById("chat-title").textContent;
    const contact = chatTitle.split(' ')[2].toLowerCase();
  
    const message = {
      text: text,
      type: 'received',
      profilePic: profilePics[contact]
    };
  
    chats[contact].push(message);
  
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "received");
  
    const imgElement = document.createElement("img");
    imgElement.src = message.profilePic;
    imgElement.alt = "Profile Picture";
    imgElement.classList.add("profile-pic");
  
    const textElement = document.createElement("span");
    textElement.innerText = text;
  
    messageElement.appendChild(imgElement);
    messageElement.appendChild(textElement);
  
    messageElement.style.opacity = "0";
    messageContainer.appendChild(messageElement);
    setTimeout(() => (messageElement.style.opacity = "1"), 50);
  }
  
  function animateProgressBar(progressBar) {
    progressBar.style.width = "0%";
    setTimeout(() => (progressBar.style.width = "100%"), 50);
  }
  
  function switchChat(contact) {
    const chatTitle = document.getElementById("chat-title");
    const messageContainer = document.getElementById("message-container");
  
    chatTitle.textContent = `Chat with ${contact.charAt(0).toUpperCase() + contact.slice(1)}`;
    messageContainer.innerHTML = '';
  
    chats[contact].forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${message.type}`;
  
      const imgElement = document.createElement("img");
      imgElement.src = message.profilePic;
      imgElement.alt = "Profile Picture";
      imgElement.classList.add("profile-pic");
  
      const textElement = document.createElement("span");
      textElement.textContent = message.text;
  
      messageElement.appendChild(imgElement);
      messageElement.appendChild(textElement);
  
      messageContainer.appendChild(messageElement);
    });
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  }
  
  function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById("theme-toggle");
    themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
  