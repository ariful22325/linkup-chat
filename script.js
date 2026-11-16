const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const actionBtn = document.getElementById('actionBtn');
const emojiBtn = document.getElementById('emojiBtn');
const attachBtn = document.getElementById('attachBtn');
const cameraBtn = document.getElementById('cameraBtn');
const fileInput = document.getElementById('fileInput');
const menuBtn = document.getElementById('menuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const attachPopup = document.getElementById('attachPopup');
const audioCallBtn = document.getElementById('audioCallBtn');
const videoCallBtn = document.getElementById('videoCallBtn');

// ইনপুটে কিছু লিখলে মাইক (🎤) থেকে সেন্ড বাটন (➤) হয়ে যাবে
messageInput.addEventListener('input', () => {
    if (messageInput.value.trim().length > 0) {
        actionBtn.innerText = "➤";
        actionBtn.title = "Send Message";
    } else {
        actionBtn.innerText = "🎙️";
        actionBtn.title = "Voice Message";
    }
});

// মেসেজ বা ভয়েস পাঠানোর ফাংশন
function handleAction() {
    const text = messageInput.value.trim();
    if (text.length > 0) {
        // টেক্সট পাঠানো
        appendMessage(text, 'sent');
        messageInput.value = "";
        actionBtn.innerText = "🎙️";
        
        // অটো রিপ্লাই
        setTimeout(() => {
            appendMessage("আপনার মেসেজটি পেয়েছি! 👍", 'received');
        }, 1000);
    } else {
        // ভয়েস নোট সিমুলেশন
        appendMessage("🎤 [Voice Message - 0:03]", 'sent');
        setTimeout(() => {
            appendMessage("ভয়েস নোটটি শোনা গেছে! 🎧", 'received');
        }, 1000);
    }
}

actionBtn.addEventListener('click', handleAction);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAction();
});

// চ্যাটে মেসেজ যোগ করার ফাংশন
function appendMessage(content, type) {
    const div = document.createElement('div');
    div.classList.add('message', type);
    div.innerHTML = content;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ইমোজি বাটন
emojiBtn.addEventListener('click', () => {
    messageInput.value += "😊👍";
    actionBtn.innerText = "➤";
});

// অ্যাটাচমেন্ট পপআপ টগল করা (📎)
attachBtn.addEventListener('click', () => {
    attachPopup.classList.toggle('hidden');
    dropdownMenu.classList.add('hidden');
});

// পপআপ থেকে অপشن সিলেক্ট করলে
function selectAttachment(type) {
    attachPopup.classList.add('hidden');
    if (type === 'Gallery' || type === 'Document') {
        fileInput.click();
    } else {
        appendMessage(`📎 [${type} Shared]`, 'sent');
        setTimeout(() => {
            appendMessage(`${type} সফলভাবে রিসিভ হয়েছে।`, 'received');
        }, 1000);
    }
}

// ফাইল সিলেক্ট হলে
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            const url = URL.createObjectURL(file);
            appendMessage(`📷 ছবি:<br><img src="${url}" style="max-width:150px; border-radius:8px; margin-top:5px;">`, 'sent');
        } else {
            appendMessage(`📄 ফাইল: ${file.name}`, 'sent');
        }
        setTimeout(() => {
            appendMessage("ফাইলটি পেয়েছি! 👍", 'received');
        }, 1000);
    }
});

// ক্যামেরা বাটন
cameraBtn.addEventListener('click', () => {
    fileInput.click();
});

// থ্রি-ডট মেনু টগল করা (⋮)
menuBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
    attachPopup.classList.add('hidden');
});

// কল বাটন
audioCallBtn.addEventListener('click', () => alert("অডিও কল হচ্ছে... 📞"));
videoCallBtn.addEventListener('click', () => alert("ভিডিও কল হচ্ছে... 📹"));
